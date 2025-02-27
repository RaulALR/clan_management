const AuthService = require("../services/auth.service");

const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const result = await AuthService.authenticate(username, password);
    if (result.error) return res.status(401).json({ error: result.error });

    // 🔥 Establecer la cookie del token (IMPORTANTE: httpOnly: true evita acceso desde JS)
    res.cookie("auth_token", result.token, {
      httpOnly: true,
      secure: false,
      maxAge: 3600000,
    });

    // 🔥 Establecer la cookie del username (para mostrar en el frontend)
    res.cookie("username", result.username, {
      httpOnly: false,
      secure: false,
      maxAge: 3600000,
    });

    res.json({ message: "Login exitoso", username: result.username });
  } catch (err) {
    console.error("Error en login:", err);
    res.status(500).json({ error: "Error en el servidor" });
  }
};

const logout = async (req, res) => {
  res.clearCookie("username");
  res.clearCookie("auth_token");
  res.json({ message: "Logout exitoso" });
};

module.exports = { login, logout };
