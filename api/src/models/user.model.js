const client = require("../config/database");

const User = {
  findByUsername: async (username) => {
    const result = await client.query("SELECT * FROM users WHERE username = $1", [username]);
    return result.rows[0];
  }
};

module.exports = User;