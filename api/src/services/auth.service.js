const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { secretKey } = require("../config/dotenv");
const User = require("../models/user.model");

const AuthService = {
  async authenticate(username, password) {
    const user = await User.findByUsername(username);
    if (!user) return { error: "Usuario no encontrado" };
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return { error: "Contraseña incorrecta" };

    const token = jwt.sign({ id: user.id, username: user.username }, secretKey, { expiresIn: "1h" });

    return { token, username: user.username };
  }
};

module.exports = AuthService;
