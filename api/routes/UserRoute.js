import express from "express";
import {
  createUser,
  getUsers,
  updateUser,
} from "./../controllers/UserControl.js";
import { verifyToken } from "../middleware/VerifyToken.js";

const router = express.Router();

router.post("/register", createUser);
router.get("/get-user", verifyToken, getUsers);
router.patch("/edit-user/:id", updateUser);

export default router;
