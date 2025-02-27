const client = require("../config/database");

const Match = {
  create: async (match) => {
    const result = await client.query(
      `INSERT INTO matches (title, competitive, creation_time, start_time, end_time, server_number, map_name, result_axis, result_allied)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING id`,
      [
        match.result.title,
        match.result.competitive,
        match.result.creation_time,
        match.result.start,
        match.result.end,
        match.result.server_number,
        match.result.map_name,
        match.result.result.axis,
        match.result.result.allied,
      ]
    );
    return result.rows[0].id;
  },

  findAll: async (sortBy = "creation_time", sortOrder = "DESC") => {
    const order = sortOrder.toUpperCase() === "ASC" ? "ASC" : "DESC";
    console.log(sortBy)
    return await client.query(
      `SELECT * FROM matches ORDER BY ${sortBy} ${order}`
    );
  },

  findById: async (id) => {
    return await client.query("SELECT * FROM matches WHERE id = $1", [id]);
  },

  delete: async (id) => {
    await client.query("DELETE FROM player_stats WHERE match_id = $1", [id]);
    return await client.query("DELETE FROM matches WHERE id = $1 RETURNING *", [
      id,
    ]);
  },
};

module.exports = Match;
