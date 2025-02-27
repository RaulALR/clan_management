const client = require("../config/database");

const PlayerStats = {
  create: async (player, matchId) => {
    return await client.query(
      `INSERT INTO player_stats (
        player_id, match_id, kills, kills_streak, deaths, 
        deaths_without_kill_streak, teamkills, teamkills_streak, deaths_by_tk, deaths_by_tk_streak,
        nb_vote_started, nb_voted_yes, nb_voted_no, time_seconds, kills_per_minute, deaths_per_minute,
        kill_death_ratio, longest_life_secs, shortest_life_secs, combat, offense, defense, support,
        most_killed, death_by, weapons, death_by_weapons
      ) VALUES (
        $1, $2, $3, $4, $5, $6, $7, $8,
        $9, $10, $11, $12, $13, $14, $15, $16, 
        $17, $18, $19, $20, $21, $22, $23, $24, 
        $25, $26, $27
      )`,
      [
        player.player_id,
        matchId,
        player.kills,
        player.kills_streak,
        player.deaths,
        player.deaths_without_kill_streak,
        player.teamkills,
        player.teamkills_streak,
        player.deaths_by_tk,
        player.deaths_by_tk_streak,
        player.nb_vote_started,
        player.nb_voted_yes,
        player.nb_voted_no,
        player.time_seconds,
        player.kills_per_minute,
        player.deaths_per_minute,
        player.kill_death_ratio,
        player.longest_life_secs,
        player.shortest_life_secs,
        player.combat,
        player.offense,
        player.defense,
        player.support,
        JSON.stringify(player.most_killed),
        JSON.stringify(player.death_by),
        JSON.stringify(player.weapons),
        JSON.stringify(player.death_by_weapons)
      ]
    );
  },
  findByPlayerId: async (player_id, sortBy, order) => {
    return await client.query(
      `SELECT ps.*, m.title, m.start_time
       FROM player_stats ps
       JOIN matches m ON ps.match_id = m.id
       WHERE ps.player_id = $1
        ORDER BY ${sortBy} ${order}`,
      [player_id]
    );
  },
};

module.exports = PlayerStats;
