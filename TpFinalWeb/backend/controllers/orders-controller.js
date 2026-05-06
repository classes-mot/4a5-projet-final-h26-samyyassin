import Order from "../models/order.js";

export const createOrder = async (req, res) => {
  const { email, items, total } = req.body;

  const nouvelleCommande = new Order({
    email,
    items,
    total
  });

  await nouvelleCommande.save();
  res.status(201).json(nouvelleCommande);
};

export const getOrders = async (req, res) => {
  const orders = await Order.find();
  res.json(orders);
};