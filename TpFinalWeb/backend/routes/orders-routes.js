import express from "express";
import {
  createOrder,
  getOrders,
  getOrderById,
  updateOrder,
  deleteOrder
} from "../controllers/orders-controller.js";

import checkAuth from "../middleware/check-auth.js";

const router = express.Router();

router.post("/", createOrder);

router.use(checkAuth);

router.get("/", getOrders);
router.get("/:id", getOrderById);
router.put("/:id", updateOrder);
router.delete("/:id", deleteOrder);

export default router;