import User from "../models/UserModel.js";
import bcrypt from "bcrypt";
import path from "path";
import fs from "fs";

export const createUser = async (req, res) => {
  // destruct request body
  let {
    username,
    firstname,
    lastname,
    email,
    password,
    confPassword,
    hp,
    address,
    kecamatan,
    city,
    province,
    pcode,
  } = req.body;

  //cek username
  let cekUname = await User.findAll({
    where: {
      ei_username: username,
    },
  });
  //cek email
  let cekEmail = await User.findAll({
    where: {
      ei_email: email,
    },
  });

  // validasi akun
  if (username === cekUname.ei_username || email === cekEmail.ei_email)
    return res.status(404).json({ msg: "Akun sudah terdaftar!" });

  // cek password
  if (password !== confPassword)
    return res.status(400).json({ msg: "Password tidak sama!" });

  // hashing password
  const salt = await bcrypt.genSalt();
  const hashPassword = await bcrypt.hash(password, salt);

  try {
    await User.create({
      ei_username: username,
      ei_firstname: firstname,
      ei_lastname: lastname,
      ei_email: email,
      ei_password: hashPassword,
      ei_hp: hp,
      ei_address: address,
      ei_kecamatan: kecamatan,
      ei_city: city,
      ei_province: province,
      ei_pcode: pcode,
    });
    res.status(201).json({ msg: "Akun Berhasil dibuat!" });
  } catch (error) {
    console.log(error.message);
  }
};

export const updateUser = async (req, res) => {
  // let { username, firstname, lastname, email, hp } = req.body;

  const user = await User.findOne({
    where: {
      ei_uuid: req.params.uuid,
    },
  });

  if (!user) return res.status(404).json({ msg: "Akun tidak ditemukan!" });

  let fileName = "";
  if (req.files === null) {
    fileName = user.ei_image;
  } else {
    let file = req.files.file;
    const fileSize = file.data.length;
    const ext = path.extname(file.name);
    fileName = file.md5 + ext;
    const allowedType = [".png", ".jpg", ".jpeg"];

    if (!allowedType.includes(ext.toLowerCase()))
      return res.status(420).json({ msg: "Image tidak valid !" });

    if (fileSize > 5000000)
      return res.status(422).json({ msg: "Image harus kurang dari 5 MB!" });

    // menghapus image pada folder public
    if (user.ei_image) {
      const filepath = `./public/pp/${user.ei_image}`;
      fs.unlinkSync(filepath);
    }

    // menyimpan image baru yg diupload
    file.mv(`./public/pp/${fileName}`, (err) => {
      if (err) return res.status(500).json({ msg: err.message });
    });
  }

  // const name = req.body.title;
  const url = `${req.protocol}://${req.get("host")}/pp/${fileName}`;

  try {
    await user.update(
      {
        ei_firstname: req.body.firstname,
        ei_lastname: req.body.lastname,
        ei_image: fileName,
        ei_urlImg: url,
      },
      {
        where: {
          ei_uuid: user.uuid,
        },
      }
    );
    res.status(200).json({ msg: "Berhasil memperbarui akun!" });
    // console.log(file);
  } catch (error) {
    console.log(error.message);
  }
};

export const updateAddressUser = async (req, res) => {
  // destruct request body
  let { address, kecamatan, city, province, pcode } = req.body;

  const user = await User.findOne({
    where: {
      ei_uuid: req.params.uuid,
    },
  });

  if (!user) return res.status(404).json({ msg: "Akun tidak ditemukan!" });

  try {
    await user.update(
      {
        ei_address: address,
        ei_kecamatan: kecamatan,
        ei_city: city,
        ei_province: province,
        ei_pcode: pcode,
      },
      {
        where: {
          ei_uuid: req.params.uuid,
        },
      }
    );
    res.status(201).json({ msg: "Berhasil memperbarui akun!" });
    // console.log(file);
  } catch (error) {
    console.log(error.message);
  }
};

export const getUsers = async (req, res) => {
  try {
    const response = await User.findAll({
      attributes: [
        ["ei_uuid", "uuid"],
        ["ei_username", "username"],
        ["ei_firstname", "firstname"],
        ["ei_lastname", "lastname"],
        ["ei_email", "email"],
        ["ei_hp", "hp"],
        ["ei_image", "img"],
        ["ei_urlImg", "url_img"],
      ],
    });
    res.json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const getUserByUuid = async (req, res) => {
  try {
    const response = await User.findOne({
      where: {
        ei_uuid: req.params.uuid,
      },
      attributes: [
        ["ei_uuid", "uuid"],
        ["ei_username", "username"],
        ["ei_firstname", "firstname"],
        ["ei_lastname", "lastname"],
        ["ei_email", "email"],
        ["ei_hp", "hp"],
        ["ei_address", "address"],
        ["ei_image", "img"],
        ["ei_urlImg", "url_img"],
        // ["ei_role", "role"],
      ],
    });
    res.json(response);
  } catch (error) {
    console.log(error.message);
  }
};
