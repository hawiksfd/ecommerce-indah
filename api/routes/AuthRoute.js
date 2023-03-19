import express from "express";
import { Login, refreshToken, Logout } from "./../controllers/AuthControl.js";
import { verifyToken } from "./../middleware/VerifyToken.js";

const router = express.Router();

router.post("/login", Login);
router.get("/rtoken", refreshToken);
router.delete("/logout", Logout);

export default router;
