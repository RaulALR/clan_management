// const express = require("express");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const client = require("../config/database");
// const { secretKey } = require("../config/dotenv");

// const router = express.Router();

// router.post("/login", async (req, res) => {
//   const { username, password } = req.body;

//   try {
//     const result = await client.query("SELECT * FROM users WHERE username = $1", [username]);
//     if (result.rows.length === 0) return res.status(404).json({ error: "Usuario no encontrado" });

//     const user = result.rows[0];
//     const validPassword = await bcrypt.compare(password, user.password);
//     if (!validPassword) return res.status(401).json({ error: "Contraseña incorrecta" });

//     const token = jwt.sign({ id: user.id, username: user.username }, secretKey, { expiresIn: "1h" });
//     res.json({ token });
//   } catch (err) {
//     console.error("Error en login:", err);
//     res.status(500).json({ error: "Error en el servidor" });
//   }
// });

// module.exports = router;

const express = require("express");
const { login, logout } = require("../controllers/auth.controller");

const router = express.Router();

router.post("/login", login);
router.post("/logout", logout);

module.exports = router;

