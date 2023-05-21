import express from "express";
import {
  addProductToChart,
  updateToProduct,
  updateProduct,
  getChartByUsers,
  getChartByUserId,
  getChartByUserUuid,
  getChartByPrdUid,
  deleteChartId,
} from "./../controllers/ChartSessControl.js";
import { verifyToken } from "./../middleware/VerifyToken.js";

const router = express.Router();

router.post("/add-to-chart/:prdid/:uid", addProductToChart);
router.patch("/update-to-chart/:prdid/:crtid", updateToProduct);
router.patch("/update-chart/:crtid", updateProduct);
router.get("/get-chart-by-users", getChartByUsers);
router.get("/get-chart-by-user/:uid", getChartByUserUuid);
router.get("/get-chart-by-product/:prdid", getChartByPrdUid);
router.get("/get-chart/:userId", verifyToken, getChartByUserId);
router.delete("/delete-chart/:cuid", verifyToken, deleteChartId);

export default router;
