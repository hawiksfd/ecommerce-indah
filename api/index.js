import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import dbei from "./config/dbei.js";
import UserRoute from "./routes/UserRoute.js";
import AuthRoute from "./routes/AuthRoute.js";
import fileUpload from "express-fileupload";

dotenv.config();

const app = express();

// try {
//   await dbei.authenticate();
//   console.log("DB Connected!");
// } catch (error) {
//   console.log(error);
// }

// (async () => {
//   await dbei.sync();
// })();

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(fileUpload());
app.use(express.static("public"));
app.use(AuthRoute);
app.use(UserRoute);

app.listen(5500, () => console.log("server up and running!"));
