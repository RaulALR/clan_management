const jwt = require("jsonwebtoken");
const { secretKey } = require("../config/dotenv");

const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) return res.status(403).json({ error: "Token requerido" });

  jwt.verify(token.replace("Bearer ", ""), secretKey, (err, decoded) => {
    if (err) return res.status(401).json({ error: "Token inválido" });
    req.user = decoded;
    next();
  });
};

module.exports = { verifyToken };
