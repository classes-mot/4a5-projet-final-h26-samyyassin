import mongoose from "mongoose";

const gateauSchema = new mongoose.Schema({
  size: { type: String, required: true },
  saveur: { type: String, required: true },
  filling: { type: String, required: true },
  prix: { type: Number, required: true }
});

export default mongoose.model("Gateau", gateauSchema);