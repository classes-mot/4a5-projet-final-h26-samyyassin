import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.js";

export const signup = async (req, res) => {
  const { nom, email, password } = req.body;

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return res.status(422).json({ message: "Cet utilisateur existe déjà." });
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  const user = new User({
    nom,
    email,
    password: hashedPassword
  });

  await user.save();

  const token = jwt.sign(
    { userId: user.id, email: user.email },
    "super_secret_key",
    { expiresIn: "1h" }
  );

  res.status(201).json({
    userId: user.id,
    email: user.email,
    token
  });
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  const existingUser = await User.findOne({ email });

  if (!existingUser) {
    return res.status(401).json({ message: "Email ou mot de passe invalide." });
  }

  const isValidPassword = await bcrypt.compare(password, existingUser.password);

  if (!isValidPassword) {
    return res.status(401).json({ message: "Email ou mot de passe invalide." });
  }

  const token = jwt.sign(
    { userId: existingUser.id, email: existingUser.email },
    "super_secret_key",
    { expiresIn: "1h" }
  );

  res.json({
    userId: existingUser.id,
    email: existingUser.email,
    token
  });
};