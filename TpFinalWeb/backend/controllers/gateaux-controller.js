import Gateau from "../models/gateau.js";

export const getGateaux = async (req, res) => {
  const gateaux = await Gateau.find();
  res.json(gateaux);
};

export const getGateauById = async (req, res) => {
  const gateau = await Gateau.findById(req.params.id);

  if (!gateau) {
    return res.status(404).json({ message: "Gâteau introuvable." });
  }

  res.json(gateau);
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

export const updateGateau = async (req, res) => {
  const { size, saveur, filling, prix } = req.body;

  const gateau = await Gateau.findById(req.params.id);

  if (!gateau) {
    return res.status(404).json({ message: "Gâteau introuvable." });
  }

  gateau.size = size ?? gateau.size;
  gateau.saveur = saveur ?? gateau.saveur;
  gateau.filling = filling ?? gateau.filling;
  gateau.prix = prix ?? gateau.prix;

  await gateau.save();

  res.json(gateau);
};

export const deleteGateau = async (req, res) => {
  const gateau = await Gateau.findById(req.params.id);

  if (!gateau) {
    return res.status(404).json({ message: "Gâteau introuvable." });
  }

  await gateau.deleteOne();

  res.json({ message: "Gâteau supprimé." });
};