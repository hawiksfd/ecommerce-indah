import express from "express";
import {
  addProductToChart,
  getChartByUsers,
  getChartByUserId,
  getChartByUserUuid,
  deleteChartId,
} from "./../controllers/ChartSessControl.js";
import { verifyToken } from "./../middleware/VerifyToken.js";

const router = express.Router();

router.post("/add-to-chart/:prdid/:uid", addProductToChart);
router.get("/get-chart-by-users", getChartByUsers);
router.get("/get-chart-by-user/:uid", getChartByUserUuid);
router.get("/get-chart/:userId", verifyToken, getChartByUserId);
router.delete("/delete-chart/:cuid", verifyToken, deleteChartId);

export default router;
