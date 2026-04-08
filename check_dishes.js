const { pool, connectDB } = require('./backend/config/db');

async function check() {
  try {
    await connectDB();
    const result = await pool.request().query("SELECT TOP 1 * FROM Dishes");
    console.log("Columns:", Object.keys(result.recordset[0] || {}));
  } catch (err) {
    console.error("Error:", err.message);
  }
  process.exit();
}
check();
