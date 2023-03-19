import express from "express";
import { createOrder, getOrder } from "./../controllers/OrderControl.js";

const router = express.Router();

router.post("/order/:chartUuid", createOrder);
router.get("/get-order", getOrder);

export default router;
