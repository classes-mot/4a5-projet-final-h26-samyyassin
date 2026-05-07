import jwt from "jsonwebtoken";

const checkAuth = (req, res, next) => {
  if (req.method === "OPTIONS") {
    return next();
  }

  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ message: "Authentification échouée." });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Token manquant." });
    }

    const decodedToken = jwt.verify(token, "super_secret_key");
    req.userData = { userId: decodedToken.userId, email: decodedToken.email };

    next();
  } catch (err) {
    return res.status(401).json({ message: "Authentification échouée." });
  }
};

export default checkAuth;