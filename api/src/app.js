const express = require("express");
const cors = require("cors");
const dotenv = require("./config/dotenv");
const database = require("./config/database");
const cookieParser = require("cookie-parser");

const authRoutes = require("./routes/auth.routes");
const playerRoutes = require("./routes/player.routes");
const matchRoutes = require("./routes/match.routes");

const app = express();

app.use(express.json({ limit: "50mb" })); 
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:4200", credentials: true }));

app.use("/api/auth", authRoutes);
app.use("/api/players", playerRoutes);
app.use("/api/matches", matchRoutes);

module.exports = app;
