import jsonwebtoken from "jsonwebtoken";
import session from "express-session";
import User from "./../models/UserModel.js";

export const verifyToken = (req, res, next) => {
  // ambil header authorization
  const authHeader = req.headers["authorization"];

  // ambil token dari header
  const token = authHeader && authHeader.split(" ")[1];

  // validasi token
  if (token == null) return res.sendStatus(401); // 401 = unauthorization

  // varify token
  jsonwebtoken.verify(
    token,
    process.env.ACCESS_TOKEN_SECRET,
    (err, decoded) => {
      // jika error
      if (err) return res.sendStatus(403); // 403 = forbiden

      // verify username
      req.ei_email = decoded.ei_email;

      // next();
    }
  );
  next();
};

export const itsMe = async (req, res, next) => {
  //jika tidak login
  if (!req.session.userId) {
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
      // kirim response
      // return res.sendStatus(200);

      // clear session
      req.session.destroy((err) => {
        if (err) return res.status(400).json({ msg: "Tidak dapat logout!" }); //jika tidak dapat logout
        res.status(202).json({ msg: "Anda telah Logout" }); // berhasil logout
      });
      res.clearCookie("connect.sid");
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  } else {
    next();
  }
};

export const verifySupreme = async (req, res, next) => {
  try {
    const supreme = await User.findOne({
      where: {
        ei_uuid: req.session.userId,
      },
    });

    // cek supreme
    if (supreme.ei_role !== "supreme") {
      res.send("Tidak ada akses!");
    } else {
      next();
    }
  } catch (error) {
    res.status(404).json({ msg: error.message });
  }
};