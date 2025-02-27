const express = require("express");
const { createMatch, getAllMatches, getMatchDetails, deleteMatch } = require("../controllers/match.controller");

const router = express.Router();

router.post("/", createMatch);
router.get("/", getAllMatches);
router.get("/:id", getMatchDetails);
router.delete("/:id", deleteMatch);

module.exports = router;
