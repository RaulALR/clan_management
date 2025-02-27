const express = require("express");
const { Client } = require("pg");
const router = express.Router();

const client = new Client({
  connectionString: process.env.DATABASE_URL,
});

// Insertar nuevas estadísticas de jugador
router.post("/stats", async (req, res) => {
  if (!client._connected) {
    await client.connect();
  }
  const {
    player_id,
    match_id,
    kills,
    deaths,
    teamkills,
    time_seconds,
    kills_per_minute,
    deaths_per_minute,
    kill_death_ratio,
    most_killed,
    death_by,
    weapons,
    death_by_weapons,
  } = req.body;
  try {
    const result = await client.query(
      `INSERT INTO stats (player_id, match_id, kills, deaths, teamkills, time_seconds, kills_per_minute, deaths_per_minute, kill_death_ratio, most_killed, death_by, weapons, death_by_weapons)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) RETURNING id`,
      [
        player_id,
        match_id,
        kills,
        deaths,
        teamkills,
        time_seconds,
        kills_per_minute,
        deaths_per_minute,
        kill_death_ratio,
        JSON.stringify(most_killed),
        JSON.stringify(death_by),
        JSON.stringify(weapons),
        JSON.stringify(death_by_weapons),
      ]
    );
    res.status(201).json({ id: result.rows[0].id });
  } catch (err) {
    console.error("Error al insertar estadísticas:", err);
    res.status(500).json({ error: "Error al crear estadísticas" });
  }
});

// Obtener estadísticas de todos los jugadores
router.get("/stats", async (req, res) => {
  try {
    const result = await client.query("SELECT * FROM stats");
    res.json(result.rows);
  } catch (err) {
    console.error("Error al obtener estadísticas:", err);
    res.status(500).json({ error: "Error al obtener estadísticas" });
  }
});

// Obtener estadísticas de un jugador específico por ID
router.get("/stats/:id", async (req, res) => {
  if (!client._connected) {
    await client.connect();
  }
  const { id } = req.params;
  try {
    const result = await client.query("SELECT * FROM stats WHERE id = $1", [
      id,
    ]);
    if (result.rows.length > 0) {
      res.json(result.rows[0]);
    } else {
      res.status(404).json({ error: "Estadísticas no encontradas" });
    }
  } catch (err) {
    console.error("Error al obtener estadísticas:", err);
    res.status(500).json({ error: "Error al obtener estadísticas" });
  }
});

module.exports = router;
