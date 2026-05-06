import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import gateauxRoutes from "./routes/gateaux-routes.js";
import ordersRoutes from "./routes/orders-routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/gateaux", gateauxRoutes);
app.use("/api/orders", ordersRoutes);

mongoose
  .connect("mongodb://127.0.0.1:27017/cake-app")
  .then(() => {
    app.listen(5000, () => {
      console.log("Server running on http://localhost:5000");
    });
  })
  .catch((err) => {
    console.log(err);
  });