import { Op } from "sequelize";
import User from "../models/UserModel.js";
import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";
// import session from "express-session";

export const Login = async (req, res) => {
  try {
    // cek akun by email
    const user = await User.findOne({
      where: {
        [Op.or]: [
          { ei_username: req.body.username },
          { ei_email: req.body.username },
        ],
      },
      // attributes: [
      //   ["ei_uuid", "uuid"],
      //   ["ei_username", "username"],
      //   ["ei_firstname", "firstname"],
      //   ["ei_lastname", "lastname"],
      //   ["ei_email", "email"],
      //   ["ei_hp", "hp"],
      //   ["ei_address", "address"],
      //   ["ei_image", "img"],
      //   ["ei_urlImg", "url_img"],
      //   ["ei_role", "role"],
      // ],
    });

    // cek user
    if (!user) return res.status(404).json({ msg: "user tidak ditemukan!" });
    // cek password
    const match = await bcrypt.compare(req.body.password, user.ei_password);

    if (!match) return res.status(400).json({ msg: "Password anda salah!" });

    // constract field user
    // req.session.userId = user.ei_uuid;
    const userId = user.ei_uuid;
    const username = user.ei_username;
    const firstname = user.ei_firstname;
    const lastname = user.ei_lastname;
    const email = user.ei_email;
    const hp = user.ei_hp;
    const img = user.ei_image;
    const urlImg = user.ei_urlImg;
    const role = user.ei_role;

    // membuat access token
    const accessToken = jsonwebtoken.sign(
      { userId, username, firstname, lastname, email, hp, img, urlImg, role },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "15s",
      }
    );

    // membuat refresh token
    const refreshToken = jsonwebtoken.sign(
      { userId, username, firstname, lastname, email, hp, img, urlImg, role },
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: "10800s",
      }
    );

    // update refresh token db
    await User.update(
      { ei_refresh_token: refreshToken },
      {
        where: {
          ei_uuid: userId,
        },
      }
    );

    // setting refresh token pada cookie
    res.cookie("refresh_token", refreshToken, {
      httpOnly: true,
      maxAge: 60 * 60 * 3 * 1000,
    });

    // kirim response ke client access token
    res.status(201).json({
      userId,
      accessToken,
    });
  } catch (error) {
    console.log(error);
    // res.status(404).json({ msg: "Akun anda tidak ditemukan!" });
  }
};

export const Logout = async (req, res) => {
  try {
    // ambil value token dari cookie
    const refreshToken = req.cookies.refresh_token;
    // validasi token
    if (!refreshToken) return res.status(204).json({ msg: "token eror" }); // 204 = no content
    // compare token dg token db
    const user = await User.findOne({
      where: {
        ei_refresh_token: refreshToken,
      },
    });
    // jika token tidak cocok
    if (!user) return res.status(204).json({ msg: "eror token akses!" });

    // update refresh_token menjadi null berdasarkan id
    await User.update(
      {
        ei_refresh_token: null,
      },
      {
        where: {
          ei_uuid: user.ei_uuid,
        },
      }
    );
    // hapus refresh token pada cookie
    res.clearCookie("refresh_token");
    console.log("berhasil logout");

    // kirim response
    return res.status(200).json({ msg: "Berhasil logout!" });
  } catch (error) {
    console.log(error);
  }
};

export const refreshToken = async (req, res, next) => {
  try {
    // ambil value token dari cookie
    const refreshToken = req.cookies.refresh_token;
    // validasi token
    if (!refreshToken)
      return res.status(401).json({ msg: "eror 401 get refresh token!" }); // 401 = unauthorization
    // compare token dg token db
    const user = await User.findOne({
      where: {
        ei_refresh_token: refreshToken,
      },
    });
    // jika token tidak cocok
    if (!user)
      return res
        .status(403)
        .json({ msg: "eror 403 get refresh token no user!" }); // 403 = forbidden
    // jika token cocok
    jsonwebtoken.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      (err, decoded) => {
        // jika eror
        if (err) return res.sendStatus(403); // 403 = forbidden

        // ambil data user
        const userId = user.ei_uuid;
        const username = user.ei_username;
        const firstname = user.ei_firstname;
        const lastname = user.ei_lastname;
        const email = user.ei_email;
        const hp = user.ei_hp;
        const img = user.ei_image;
        const urlImg = user.ei_urlImg;
        const role = user.ei_role;

        // buat token baru
        const accessToken = jsonwebtoken.sign(
          {
            userId,
            username,
            firstname,
            lastname,
            email,
            hp,
            img,
            urlImg,
            role,
          },
          process.env.ACCESS_TOKEN_SECRET,
          {
            expiresIn: "15s",
          }
        );
        // kirim response ke user
        res.json({ userId, accessToken });
      }
    );
  } catch (error) {
    console.log(error);
    // next();
  }
};