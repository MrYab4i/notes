const { Pool } = require("pg");
const pool = new Pool({
    user: "yabai",
    host: 'localhost',
    database: "notes_api",
    PASSWORD: "021101",
    port: 5432
})

module.exports = pool;