import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import dbei from "./config/dbei.js";
import UserRoute from "./routes/UserRoute.js";
import AuthRoute from "./routes/AuthRoute.js";
import ProductRoute from "./routes/ProductRoute.js";
import ChartSessRoute from "./routes/ChartSessRoute.js";
import OrderRoute from "./routes/OrderRoute.js";
import PaymentRoute from "./routes/PaymentRoute.js";
import fileUpload from "express-fileupload";
import session from "express-session";
import SequelizeStore from "connect-session-sequelize";

dotenv.config();

const app = express();

// try {
//   await dbei.authenticate();
//   console.log("DB Connected!");
// } catch (error) {
//   console.log(error);
// }

//##########################################   deklarasi session
// const sessionStore = SequelizeStore(session.Store);

// const store = new sessionStore({
//   db: dbei,
//   checkExpirationInterval: 1000 * 60 * 60 * 3 + 15,
// });
//##########################################   deklarasi session
// app.use(
// session({
//   secret: process.env.SESS_SECRET,
//   resave: false,
//   saveUninitialized: true,
//   store: store,
//   cookie: {
//     maxAge: 1000 * 60 * 60 * 3,
//   },
// })
// );

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(fileUpload());
app.use(express.static("public"));
app.use(AuthRoute);
app.use(UserRoute);
app.use(ProductRoute);
app.use(ChartSessRoute);
app.use(OrderRoute);
app.use(PaymentRoute);

app.listen(5500, async () => {
  console.log("server up and running!");
  // await dbei.sync({ alter: true });
  // console.log("Database synced!");
});
