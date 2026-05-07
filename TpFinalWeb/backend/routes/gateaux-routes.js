import express from "express";
import { getGateaux, createGateau } from "../controllers/gateaux-controller.js";

const router = express.Router();

router.get("/", getGateaux);
router.post("/", createGateau);

export default router;