const client = require("../config/database");

const Player = {
  create: async (player) => {
    const isLCM = player.player.includes('LCM')
    const result = await client.query(
      `INSERT INTO players (player_id, names, steaminfo, lcm)
       VALUES ($1, $2, $3, $4) RETURNING id`,
      [player.player_id, JSON.stringify(player.player), JSON.stringify(player.steaminfo), isLCM]
    );
    return result.rows[0].id;
  },

  findAll: async (filters) => {
    let query = "SELECT * FROM players WHERE 1=1";
    let params = [];
    let count = 1;

    if (filters.name) {
      query += ` AND names::text ILIKE $${count}`;
      params.push(`%${filters.name}%`);
      count++;
    }

    if (filters.player_id) {
      query += ` AND player_id = $${count}`;
      params.push(filters.player_id);
      count++;
    }

    if (filters.lcm !== undefined) {
      query += ` AND lcm = $${count}`;
      params.push(filters.lcm === "true");
      count++;
    }

    return await client.query(query, params);
  },

  findById: async (id) => {
    return await client.query("SELECT * FROM players WHERE player_id = $1", [id]);
  }
};

module.exports = Player;
