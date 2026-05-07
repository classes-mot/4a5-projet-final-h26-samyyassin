import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  email: { type: String, required: true },
  items: [
    {
      gateauId: String,
      size: String,
      saveur: String,
      filling: String,
      quantite: Number,
      prix: Number
    }
  ],
  total: { type: Number, required: true },
  statut: { type: String, default: "en attente" }
});

export default mongoose.model("Order", orderSchema);