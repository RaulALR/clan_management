const MatchService = require("../services/match.service");

const createMatch = async (req, res) => {
  try {
    const matchId = await MatchService.createMatch(req.body);
    res.status(201).json({ message: "Partida creada con éxito", matchId });
  } catch (err) {
    console.error("Error al crear la partida:", err);
    res.status(500).json({ error: "Error al crear la partida" });
  }
};

const getAllMatches = async (req, res) => {
  try {
    const { sortBy, sortOrder } = req.query;
    const result = await MatchService.getAllMatches(sortBy, sortOrder);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: "Error al obtener partidas" });
  }
};

const getMatchDetails = async (req, res) => {
  try {
    const { sortBy, sortOrder } = req.query;
    const match = await MatchService.getMatchDetails(
      req.params.id,
      sortBy,
      sortOrder
    );
    if (!match) return res.status(404).json({ error: "Partida no encontrada" });
    res.json(match);
  } catch (err) {
    res.status(500).json({ error: "Error al obtener la partida" });
  }
};

const deleteMatch = async (req, res) => {
  try {
    const result = await MatchService.deleteMatch(req.params.id);
    if (result.rowCount === 0)
      return res.status(404).json({ error: "Partida no encontrada" });
    res.json({ message: `Partida con ID ${req.params.id} eliminada` });
  } catch (err) {
    res.status(500).json({ error: "Error al eliminar la partida" });
  }
};

module.exports = { createMatch, getAllMatches, getMatchDetails, deleteMatch };
