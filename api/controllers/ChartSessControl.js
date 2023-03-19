import Product from "./../models/ProductModel.js";
import User from "./../models/UserModel.js";
import ChartItem from "./../models/ChartItemModel.js";
import Discount from "./../models/DiscountModel.js";

export const addProductToChart = async (req, res) => {
  const { qty } = req.body;

  try {
    const user = await User.findOne({
      where: { ei_uuid: req.params.uid },
    });
    const product = await Product.findOne({
      where: { ei_uuid: req.params.prdid },
    });

    const addChart = await ChartItem.create({
      userId: user.id,
      productId: product.id,
      ei_qty: qty,
    });

    res.status(201).json({ msg: "Berhasil menambah ke keranjang!" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
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
    });

    res.status(201).json(Chart);
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

