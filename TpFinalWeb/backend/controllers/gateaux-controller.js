import Gateau from "../models/gateau.js";

export const getGateaux = async (req, res) => {
  const gateaux = await Gateau.find();
  res.json(gateaux);
};

export const createGateau = async (req, res) => {
  const { size, saveur, filling, prix } = req.body;

  const nouveauGateau = new Gateau({
    size,
    saveur,
    filling,
    prix
  });

  await nouveauGateau.save();
  res.status(201).json(nouveauGateau);
};