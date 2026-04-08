const { pool, connectDB } = require("./config/db");

async function checkSchema() {
    await connectDB();
    
    // Check tables
    const tables = await pool.request().query("SELECT name FROM sys.tables");
    console.log("Tables:", tables.recordset.map(t => t.name));
    
    // Check columns of Reservations
    const resColumns = await pool.request().query(`
        SELECT COLUMN_NAME
        FROM INFORMATION_SCHEMA.COLUMNS
        WHERE TABLE_NAME = 'Reservations'
    `);
    console.log("Reservations Cols:", resColumns.recordset.map(c => c.COLUMN_NAME));

    process.exit(0);
}

checkSchema();
