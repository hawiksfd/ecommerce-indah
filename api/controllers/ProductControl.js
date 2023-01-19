import Product from "./../models/ProductModel.js";
import path from "path";
import fs from "fs";
import Discount from "./../models/DiscountModel.js";

export const createProduct = async (req, res) => {
  // destruct request body
  let { name, desc, price } = req.body;

  if (name === null && price === null) {
    return res.status(402).json({ msg: "Isi data dengan benar!" });
  }

  let fileName = "";
  if (req.files === null) {
    return res.status(404).json({ msg: "Silahkan tambahkan gambar produk!" });
  } else {
    let file = req.files.img;
    const fileSize = file.data.length;
    const ext = path.extname(file.name);
    fileName = file.md5 + ext;
    const allowedType = [".png", ".jpg", ".jpeg"];

    if (!allowedType.includes(ext.toLowerCase()))
      return res.status(420).json({ msg: "Image tidak valid !" });

    if (fileSize > 5000000)
      return res.status(422).json({ msg: "Image harus kurang dari 5 MB!" });

    // menghapus image pada folder public
    // if (user.ei_image) {
    //   const filepath = `./public/product/${user.ei_image}`;
    //   fs.unlinkSync(filepath);
    // }

    // menyimpan image baru yg diupload
    file.mv(`./public/product/${fileName}`, (err) => {
      if (err) return res.status(500).json({ msg: err.message });
    });
  }

  // const name = req.body.title;
  const url = `${req.protocol}://${req.get("host")}/product/${fileName}`;

  try {
    await Product.create({
      ei_name: name,
      ei_desc: desc,
      ei_price: price,
      ei_image_product: fileName,
      ei_url_img_product: url,
    });
    res.status(201).json({ msg: "Produk Berhasil dibuat!" });
  } catch (error) {
    console.log(error.message);
  }
};

export const getProducts = async (req, res) => {
  try {
    const response = await Product.findAll({
      attributes: [
        ["ei_uuid", "uuid"],
        ["ei_name", "name"],
        ["ei_desc", "desc"],
        ["ei_price", "price"],
        // ["discountId"],
        ["ei_image_product", "img_prd"],
        ["ei_url_img_product", "url_img_prd"],
      ],
      include: {
        model: Discount,
        attributes: [
          ["ei_uuid", "uuid"],
          ["ei_name", "name"],
          ["ei_start", "start_date"],
          ["ei_end", "end_date"],
          // ["discountId"],
          ["ei_discount_percent", "discount_percent"],
        ],
      },
    });
    res.json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const discProduct = async (req, res) => {
  const { name, startDate, endDate, discPersen } = req.body;

  try {
    await Discount.create({
      ei_name: name,
      ei_start: startDate,
      ei_end: endDate,
      ei_discount_percent: discPersen,
    });
    res.status(201).json({ msg: "Berhasil membuat discount!" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
