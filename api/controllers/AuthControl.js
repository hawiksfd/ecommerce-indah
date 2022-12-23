import { Op } from "sequelize";
import User from "../models/UserModel.js";
import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";

export const Login = async (req, res) => {
  try {
    // cek akun by email
    const user = await User.findOne({
      where: {
        [Op.or]: [
          { ei_username: req.body.username },
          // { ei_email: req.body.email },
        ],
      },
    });

    // cek password
    const match = await bcrypt.compare(req.body.password, user.ei_password);

    if (!match) return res.status(400).json({ msg: "Password anda salah!" });

    // constract field user
    // req.session.userId = user.uuid;
    const userId = user.ei_uuid;
    const username = user.ei_username;
    const firstname = user.ei_firstname;
    const lastname = user.ei_lastname;
    const email = user.ei_email;
    const hp = user.ei_hp;
    const img = user.ei_image;
    const urlImg = user.ei_urlImg;

    // membuat access token
    const accessToken = jsonwebtoken.sign(
      { userId, username, firstname, lastname, email, hp, img, urlImg },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "15s",
      }
    );

    // membuat refresh token
    const refreshToken = jsonwebtoken.sign(
      { userId, username, firstname, lastname, email, hp, img, urlImg },
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: "1d",
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
      maxAge: 24 * 60 * 60 * 1000,
    });

    // kirim response ke client access token
    res.json({ userId, accessToken });
  } catch (error) {
    console.log(error);
    // res.status(404).json({ msg: "Akun anda tidak ditemukan!" });
  }
};

export const refreshToken = async (req, res) => {
  try {
    // ambil value token dari cookie
    const refreshToken = req.cookies.refresh_token;
    // validasi token
    if (!refreshToken) return res.sendStatus(401); // 401 = unauthorization
    // compare token dg token db
    const user = await User.findOne({
      where: {
        ei_refresh_token: refreshToken,
      },
    });
    // jika token tidak cocok
    if (!user) return res.sendStatus(403); // 403 = forbidden
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

        // buat token baru
        const accessToken = jsonwebtoken.sign(
          { userId, username, firstname, lastname, email, hp, img, urlImg },
          process.env.ACCESS_TOKEN_SECRET,
          {
            expiresIn: "15s",
          }
        );
        // kirim response ke user
        res.json({ accessToken });
      }
    );
  } catch (error) {
    console.log(error);
  }
};

export const Logout = async (req, res) => {
  // ambil value token dari cookie
  const refreshToken = req.cookies.refresh_token;
  // validasi token
  if (!refreshToken) return res.sendStatus(204); // 204 = no content
  // compare token dg token db
  const user = await User.findOne({
    where: {
      ei_refresh_token: refreshToken,
    },
  });
  // jika token tidak cocok
  if (!user) return res.status(204).json({ msg: "eror token akses!" });
  // ambil id dari db
  const userId = user.ei_uuid;
  // update refresh_token menjadi null berdasarkan id
  await User.update(
    {
      ei_refresh_token: null,
    },
    {
      where: {
        ei_uuid: userId,
      },
    }
  );
  // hapus refresh token pada cookie
  res.clearCookie("refresh_token");
  // kirim response
  return res.sendStatus(200);
};