const PlayerService = require("../services/player.service");

const createPlayer = async (req, res) => {
  try {
    const playerId = await PlayerService.createPlayer(req.body);
    res.status(201).json({ id: playerId });
  } catch (err) {
    console.error("Error al insertar jugador:", err);
    res.status(500).json({ error: "Error al crear jugador" });
  }
};

const getAllPlayers = async (req, res) => {
  try {
    const result = await PlayerService.getAllPlayers(req.query);
    res.json(result.rows);
  } catch (err) {
    console.error("Error al obtener jugadores:", err);
    res.status(500).json({ error: "Error al obtener jugadores" });
  }
};

const getPlayerDetails = async (req, res) => {
  try {
    const { sortBy, sortOrder } = req.query;
    const player = await PlayerService.getPlayerDetails(
      req.params.id,
      sortBy,
      sortOrder
    );
    if (!player)
      return res.status(404).json({ error: "Jugador no encontrado" });
    res.json(player);
  } catch (err) {
    console.error("Error al obtener el detalle del jugador:", err);
    res.status(500).json({ error: "Error al obtener el detalle del jugador" });
  }
};

const getAllPlayersWithDetails = async (req, res) => {
  try {
    const { name, player_id, lcm, sortBy, sortOrder } = req.query;
    const filters = { name, player_id, lcm };

    const players = await PlayerService.getAllPlayersWithDetails(filters, sortBy, sortOrder);
    res.json(players);
  } catch (error) {
    console.error("Error al obtener jugadores:", error);
    res.status(500).json({ error: "Error en el servidor" });
  }
};

module.exports = {
  createPlayer,
  getAllPlayers,
  getPlayerDetails,
  getAllPlayersWithDetails,
};
