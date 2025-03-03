const express = require("express");
const {
  createPlayer,
  getAllPlayers,
  getPlayerDetails,
  getAllPlayersWithDetails,
} = require("../controllers/player.controller");

const router = express.Router();

router.post("/", createPlayer);
router.get("/", getAllPlayers);
router.get("/:id", getPlayerDetails);
router.get("/all/details", getAllPlayersWithDetails);

module.exports = router;
