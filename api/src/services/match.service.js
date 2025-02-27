const Match = require("../models/match.model");
const Player = require("../models/player.model");
const PlayerStats = require("../models/playerStats.model");
const client = require("../config/database");

const MatchService = {
  createMatch: async (matchData) => {
    const matchId = await Match.create(matchData);
    for (const player of matchData.result.player_stats) {
      let playerExists = await Player.findById(player.player_id);
      if (playerExists.rows.length === 0) {
        await Player.create(player);
      }

      await PlayerStats.create(player, matchId);
    }

    return matchId;
  },

  getAllMatches: async (sortBy, sortOrder) => {
    return await Match.findAll(sortBy, sortOrder);
  },

  getMatchDetails: async (id, sortBy, sortOrder) => {
    const matchResult = await Match.findById(id);
    if (matchResult.rows.length === 0) {
      return null;
    }
    const order = sortOrder.toUpperCase() === "ASC" ? "ASC" : "DESC";
    const playerStatsResult = await client.query(
      `SELECT ps.*, p.names 
       FROM player_stats ps
       JOIN players p ON ps.player_id = p.player_id
       WHERE ps.match_id = $1
       ORDER BY ${sortBy} ${order}`,
      [id]
    );

    return {
      match: matchResult.rows[0],
      player_stats: playerStatsResult.rows,
    };
  },

  deleteMatch: async (id) => {
    return await Match.delete(id);
  },
};

module.exports = MatchService;
