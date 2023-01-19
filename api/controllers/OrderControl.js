import OrderDetail from "./../models/OrderDetailModel.js";
import ChartItem from "./../models/ChartItemModel.js";
import User from "./../models/UserModel.js";
import Discount from "./../models/DiscountModel.js";
import Product from "./../models/ProductModel.js";

export const createOrder = async (req, res) => {
  var { shipCost, total } = req.body;

  const chart = await ChartItem.findOne({
    where: { ei_uuid: req.params.chartUuid },
  });

  try {
    const order = await OrderDetail.create({
      chartItemId: chart.id,
      ei_ship_cost: shipCost,
      ei_total: total,
    });

    res.status(201).json({ msg: "Berhasil membuat pesanan!" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getOrder = async (req, res) => {
  try {
    const orderAll = await OrderDetail.findAll({
      attributes: [
        ["ei_uuid", "uuid"],
        ["ei_ship_cost", "shipCost"],
        ["ei_total", "total"],
      ],
      include: {
        model: ChartItem,
        as: "chart_item",
        attributes: [
          ["ei_uuid", "uuid"],
          ["ei_qty", "quantity"],
        ],
        include: [
          {
            model: User,
            as: "user",
            attributes: [
              ["ei_uuid", "uuid"],
              ["ei_firstname", "firstname"],
              ["ei_lastname", "lastname"],
              ["ei_hp", "hp"],
              ["ei_image", "img"],
              ["ei_urlImg", "url_img"],
            ],
          },
          {
            model: Product,
            attributes: [
              ["ei_uuid", "uuid"],
              ["ei_name", "name"],
              ["ei_desc", "desc"],
              ["ei_price", "price"],
              ["ei_image_product", "img"],
              ["ei_url_img_product", "url_img"],
            ],
            include: {
              model: Discount,
              as: "discount",
              attributes: [["ei_discount_percent", "discount_persen"]],
            },
          },
        ],
      },
    });

    res.status(201).json(orderAll);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
