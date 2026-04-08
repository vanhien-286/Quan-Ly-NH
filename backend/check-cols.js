const { pool, connectDB } = require("./config/db");

async function checkDetails() {
    await connectDB();
    const result = await pool.request().query(`
        SELECT COLUMN_NAME, DATA_TYPE
        FROM INFORMATION_SCHEMA.COLUMNS
        WHERE TABLE_NAME = 'Users'
    `);
    console.table(result.recordset);
    process.exit(0);
}

checkDetails();
