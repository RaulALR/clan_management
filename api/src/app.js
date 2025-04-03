const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const dotenv = require("./config/dotenv");
const database = require("./config/database");
const cookieParser = require("cookie-parser");

const authRoutes = require("./routes/auth.routes");
const playerRoutes = require("./routes/player.routes");
const matchRoutes = require("./routes/match.routes");

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: [],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  },
});

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cookieParser());

app.use(
  cors({
    origin: [],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use("/api/auth", authRoutes);
app.use("/api/players", playerRoutes);
app.use("/api/matches", matchRoutes);

let connectedBots = {};

io.on("connection", (socket) => {
  console.log("Nuevo cliente conectado:", socket.id);

  socket.on("registerBot", (botName) => {
    connectedBots[botName] = socket;
    console.log(`Bot registrado: ${botName}`);
  });

  socket.on("sendCommand", (data) => {
    const { botName, command } = data;
    if (connectedBots[botName]) {
      connectedBots[botName].emit("executeCommand", {botName, command});
      console.log(`Comando "${command}" enviado al bot: ${botName}`);
    } else {
      console.log(`Bot ${botName} no encontrado.`);
    }
  });

  socket.on("disconnect", () => {
    console.log(`Cliente desconectado: ${socket.id}`);
    Object.keys(connectedBots).forEach((bot) => {
      if (connectedBots[bot] === socket) {
        delete connectedBots[bot];
      }
    });
  });
});

module.exports = { app, server };
