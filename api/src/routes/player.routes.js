const express = require("express");
const { createPlayer, getAllPlayers, getPlayerDetails } = require("../controllers/player.controller");

const router = express.Router();

router.post("/", createPlayer);
router.get("/", getAllPlayers);
router.get("/:id", getPlayerDetails);

module.exports = router;
