import express from "express";
import {
  createUser,
  getUsers,
  updateUser,
  updateAvaUser,
  getUserByUuid,
  updateAddressUser,
} from "./../controllers/UserControl.js";
import {
  verifyToken,
  itsMe,
  verifySupreme,
} from "../middleware/VerifyToken.js";

const router = express.Router();

router.post("/register", createUser);
router.patch("/edit-user/:uid", verifyToken, updateUser);
router.patch("/edit-address-user/:uid", verifyToken, updateAddressUser);
router.get("/get-users", verifySupreme, getUsers);
router.get("/get-user/:uuid", verifyToken, getUserByUuid);


export default router;
