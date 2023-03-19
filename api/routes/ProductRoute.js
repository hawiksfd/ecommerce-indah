import express from "express";
import {
  createProduct,
  getProducts,
  discProduct,
  getProductsById,
} from "./../controllers/ProductControl.js";
import {
  verifyToken,
  itsMe,
  verifySupreme,
} from "./../middleware/VerifyToken.js";

const router = express.Router();

router.post("/create-product", verifySupreme, createProduct);
router.get("/get-all-product", getProducts);
router.get("/get-product/:uid", getProductsById);
router.post("/create-discount", discProduct);

export default router;
