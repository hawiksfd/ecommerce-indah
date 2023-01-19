import midtransClient from "midtrans-client";
import PaymentDetail from "./../models/PaymentDetailModel.js";
import OrderDetail from "./../models/OrderDetailModel.js";

// Create Core API instance
var coreApi = new midtransClient.CoreApi({
  isProduction: false,
  serverKey: "SB-Mid-server-rTydPQq3Hp3RrqEtVbzv_EJU",
  clientKey: "SB-Mid-client-4G6ZKXb8InB1yN9d",
});

export const paymentCharge = async (req, res, next) => {
  // coreApi
  //   .charge(req.body)
  //   .then((chargeResponse) => {
  //     var dataOrder = {
  //       id: chargeResponse.order_id,
  //       orderDetailId: req.params.orderId,
  //       ei_amount: req.body.transaction_details.gross_amount,
  //       ei_provider: JSON.stringify(chargeResponse),
  //       ei_status: chargeResponse.status_message,
  //     };

  //     Order.create(dataOrder)
  //       .then((data) => {
  //         res.json({
  //           status: true,
  //           pesan: "Berhasil Order",
  //           data: data,
  //         });
  //       })
  //       .catch((err) => {
  //         res.json({
  //           status: false,
  //           pesan: "Gagal Order: " + err.message,
  //           data: [],
  //         });
  //       });
  //   })
  //   .catch((e) => {
  //     res.json({
  //       status: false,
  //       pesan: "Gagal order: " + e.message,
  //       data: [],
  //     });
  //   });

  // try catch

  try {
    const findOrder = await OrderDetail.findOne({
      where: { ei_uuid: req.params.orderUuId },
    });

    const chargeResponse = await coreApi.charge(req.body);

    const paymentOrder = await PaymentDetail.create({
      orderDetailId: findOrder.id,
      ei_id_order: req.body.transaction_details.order_id,
      ei_amount: req.body.transaction_details.gross_amount,
      ei_provider: JSON.stringify(chargeResponse),
      ei_status: chargeResponse.transaction_status,
    });

    res
      .status(201)
      .json({ msg: "Berhasil membuat charge payment!", data: chargeResponse });
    // res.send(chargeResponse);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const paymentStatus = async (req, res, next) => {
  var statusCharge = await coreApi.transaction.status(req.params.orderId);
  // res.send(statusCharge);
  var findPayment = await PaymentDetail.findOne({
    where: {
      ei_id_order: req.params.orderId,
    },
  });

  if (!findPayment)
    return res.status(404).json({ msg: "Payment tidak ditemukan!" });

  if (findPayment.ei_status == "settlement")
    return res.status(203).json({ msg: "Status sudah terupdate!" });

  if (statusCharge.transaction_status == "settlement") {
    try {
      await PaymentDetail.update(
        {
          ei_provider: JSON.stringify(statusCharge),
          ei_status: statusCharge.transaction_status,
        },
        {
          where: {
            ei_id_order: statusCharge.order_id,
          },
        }
      );

      res
        .status(201)
        .json({ msg: "Berhasil update status payment!", data: statusCharge });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  } else {
    res.status(404).json({ msg: "Payment belum terbayar!" });
  }
};
