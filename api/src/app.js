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
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: [],
    credentials: true,
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: "Content-Type,Authorization"
  })
);

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin"); // O "*"
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.header("Access-Control-Allow-Credentials", "true");
  
    if (req.method === "OPTIONS") {
      return res.sendStatus(204);
    }
  
    next();
  });

app.use("/api/auth", authRoutes);
app.use("/api/players", playerRoutes);
app.use("/api/matches", matchRoutes);

module.exports = app;
