import Product from "./../models/ProductModel.js";
import User from "./../models/UserModel.js";
import ChartItem from "./../models/ChartItemModel.js";
import Discount from "./../models/DiscountModel.js";

export const addProductToChart = async (req, res) => {
  const { qty } = req.body;

  const user = await User.findOne({
    where: { ei_uuid: req.params.uid },
  });
  const product = await Product.findOne({
    where: { ei_uuid: req.params.prdid },
  });
  try {
    await ChartItem.create({
      userId: user.id,
      uuid_user: req.params.uid,
      productId: product.id,
      uuid_product: req.params.prdid,
      ei_qty: qty,
    });
    res.status(201).json({ msg: "Berhasil menambah ke keranjang!" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const updateToProduct = async (req, res) => {
  const { qty } = req.body;

  const chartExist = await ChartItem.findOne({
    where: { uuid_product: req.params.prdid },
  });

  try {
    await ChartItem.update(
      {
        ei_qty: chartExist.ei_qty + qty,
      },
      {
        where: { ei_uuid: req.params.crtid },
      }
    );
    res.status(200).json({ msg: "Berhasil menambah produk!" });
  } catch (error) {
    console.log(error.message);
  }
};

export const updateProduct = async (req, res) => {
  const { qty } = req.body;

  const chart = await ChartItem.findOne({
    where: { ei_uuid: req.params.crtid },
  });

  try {
    await ChartItem.update(
      {
        ei_qty: chart.ei_qty + qty,
      },
      {
        where: { ei_uuid: req.params.crtid },
      }
    );
    res.status(200).json({ msg: "Berhasil merubah kuantiti produk!" });
  } catch (error) {
    console.log(error.message);
  }
};

export const getChartByUsers = async (req, res) => {
  try {
    const Chart = await User.findAll({
      attributes: [
        ["ei_uuid", "uuid"],
        ["ei_firstname", "firstname"],
        ["ei_lastname", "lastname"],
        ["ei_hp", "hp"],
        ["ei_image", "img"],
        ["ei_urlImg", "url_img"],
      ],
      include: [
        {
          model: ChartItem,
          attributes: [
            ["ei_uuid", "uuid"],
            ["ei_qty", "quantity"],
          ],
          include: [
            {
              model: Product,
              attributes: [
                ["ei_uuid", "uuid"],
                ["ei_name", "name"],
                ["ei_desc", "desc"],
                ["ei_price", "price"],
                // ["discountId", "discount"],
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
      ],
      // where: { ei_userId: 2 },
    });

    res.status(201).json(Chart);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getChartByUserUuid = async (req, res) => {
  try {
    const Chart = await User.findOne({
      where: {
        ei_uuid: req.params.uid,
      },
      attributes: [
        ["ei_uuid", "userId"],
        // ["ei_firstname", "firstname"],
        // ["ei_lastname", "lastname"],
        // ["ei_hp", "hp"],
        // ["ei_image", "img"],
        // ["ei_urlImg", "url_img"],
      ],
      include: [
        {
          model: ChartItem,
          // as: "chart",
          attributes: [
            ["ei_uuid", "uuid"],
            ["ei_qty", "quantity"],
          ],
          include: [
            {
              model: Product,
              as: "product",
              attributes: [
                ["ei_uuid", "uuid"],
                ["ei_name", "name"],
                ["ei_desc", "desc"],
                ["ei_price", "price"],
                // ["discountId", "discount"],
                ["ei_image_product", "img"],
                ["ei_url_img_product", "url_img"],
              ],
              include: {
                model: Discount,
                as: "discount",
                attributes: [["ei_discount_percent", "discount_percent"]],
              },
            },
          ],
        },
      ],
    });

    // const shopCost = (Chart) => {
    //   let total = 0;
    //   for (let i = 0; i < Chart.length; i++) {
    let discExist = Chart.chart_items[0].product.discount;
    let discPersen = Chart.chart_items[0].product.discount.discount_percent;
    // let quantity = Chart.chart_items[i].quantity;
    let price = Chart.chart_items[0].product.price;
    // let lastPrice = discExist ? price - (price * discPersen) / 100 : price;
    // console.log(discExist);
    //     total += quantity * lastPrice;
    //   }
    //   return total;
    // };
    // console.log(discExist);
    // console.log(price);

    // res.status(201).json(Chart, userid, product,);
    res.status(201).json({ Chart, discExist });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getChartByUserId = async (req, res) => {
  // const discount = await Discount.findAll();

  try {
    const Chart = await ChartItem.findAll({
      where: {
        userId: req.params.userId,
      },
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
          as: "product",
          attributes: [
            ["ei_uuid", "uuid"],
            ["ei_name", "name"],
            ["ei_desc", "desc"],
            ["ei_price", "price"],
            // ["discountId", "discount"],
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
      // nest: true,
    });

    res.status(201).json(Chart);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getChartByPrdUid = async (req, res) => {
  try {
    const Chart = await ChartItem.findAll({
      where: {
        uuid_product: req.params.prdid,
      },
      attributes: [
        ["ei_uuid", "uuid"],
        // ["ei_qty", "quantity"],
        // ["uuid_user", "userid"],
        ["uuid_product", "product_id"],
      ],
      // include: [
      //   {
      //     model: User,
      //     as: "user",
      //     attributes: [
      //       ["ei_uuid", "uuid"],
      //       ["ei_firstname", "firstname"],
      //       ["ei_lastname", "lastname"],
      //       ["ei_hp", "hp"],
      //       ["ei_image", "img"],
      //       ["ei_urlImg", "url_img"],
      //     ],
      //   },
      //   {
      //     model: Product,
      //     as: "product",
      //     attributes: [
      //       ["ei_uuid", "uuid"],
      //       ["ei_name", "name"],
      //       ["ei_desc", "desc"],
      //       ["ei_price", "price"],
      //       // ["discountId", "discount"],
      //       ["ei_image_product", "img"],
      //       ["ei_url_img_product", "url_img"],
      //     ],
      //     include: {
      //       model: Discount,
      //       as: "discount",
      //       attributes: [["ei_discount_percent", "discount_persen"]],
      //     },
      //   },
      // ],
    });

    res.status(201).json(Chart);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const deleteChartId = async (req, res) => {
  try {
    await ChartItem.destroy({
      where: {
        ei_uuid: req.params.cuid,
      },
    });
    res.status(200).json("msg: berhasil menghapus chart product!");
  } catch (error) {
    console.log(error.message);
  }
};