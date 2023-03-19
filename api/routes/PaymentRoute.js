import express from "express";
import {
  paymentCharge,
  paymentStatus,
} from "./../controllers/PaymentControl.js";

const router = express.Router();

router.post("/payment-charge/:orderUuId", paymentCharge);
router.patch("/payment-status/:orderId", paymentStatus);

export default router;
