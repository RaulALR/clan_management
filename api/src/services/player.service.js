const Player = require("../models/player.model");
const PlayerStats = require("../models/playerStats.model");
const client = require("../config/database");

const PlayerService = {
  createPlayer: async (playerData) => {
    return await Player.create(playerData);
  },

  getAllPlayers: async (filters) => {
    return await Player.findAll(filters);
  },

  getPlayerDetails: async (id, sortBy, order) => {
    const playerResult = await Player.findById(id);
    if (playerResult.rows.length === 0) {
      return null;
    }

    const playerStatsResult = await PlayerStats.findByPlayerId(id, sortBy, order);

    return {
      player: playerResult.rows[0],
      player_stats: playerStatsResult.rows,
    };
  }
};

module.exports = PlayerService;
