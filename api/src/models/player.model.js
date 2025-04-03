const client = require("../config/database");

const Player = {
  create: async (player) => {
    const isLCM = player.player.includes("LCM");
    const result = await client.query(
      `INSERT INTO players (player_id, names, steaminfo, lcm)
       VALUES ($1, $2, $3, $4) RETURNING id`,
      [
        player.player_id,
        JSON.stringify(player.player),
        JSON.stringify(player.steaminfo),
        isLCM,
      ]
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
    return await client.query("SELECT * FROM players WHERE player_id = $1", [
      id,
    ]);
  },
  findAllWithStats: async (filters, sortBy, sortOrder) => {
    let query = `
      SELECT 
        p.id, 
        p.player_id, 
        p.names, 
        p.lcm, 
        COALESCE(ROUND(AVG(ps.kills), 2), 0) AS avg_kills,
        COALESCE(ROUND(AVG(ps.kills_per_minute), 2), 0) AS avg_kills_per_minute,
        COALESCE(ROUND(AVG(ps.kill_death_ratio), 2), 0) AS avg_kill_death_ratio
      FROM players p
      LEFT JOIN player_stats ps ON p.player_id = ps.player_id
      WHERE 1=1
    `;

    let params = [];
    let count = 1;

    if (filters.name) {
      query += ` AND p.names::text ILIKE $${count}`;
      params.push(`%${filters.name}%`);
      count++;
    }

    if (filters.player_id) {
      query += ` AND p.player_id = $${count}`;
      params.push(filters.player_id);
      count++;
    }

    if (filters.lcm !== undefined) {
      query += ` AND p.lcm = $${count}`;
      params.push(filters.lcm === "true");
      count++;
    }

    query += " GROUP BY p.id, p.player_id, p.names, p.lcm";

    const validSortFields = [
      "player_id",
      "names",
      "avg_kills",
      "avg_kills_per_minute",
      "avg_kill_death_ratio",
    ];
    if (sortBy && validSortFields.includes(sortBy)) {
      const order =
        sortOrder && sortOrder.toLowerCase() === "desc" ? "DESC" : "ASC";
      query += ` ORDER BY ${sortBy} ${order}`;
    }

    const result = await client.query(query, params);
    return result.rows;
  },
};

module.exports = Player;
