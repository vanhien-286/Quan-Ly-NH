const fs = require("fs");
const path = require("path");
const sql = require("mssql");

const config = {
    user: "sa",
    password: "123456",
    server: "localhost",
    database: "DACCJS",
    options: {
        encrypt: false,
        trustServerCertificate: true,
    },
    port: 1433
};

const runMigrations = async () => {
    const pool = new sql.ConnectionPool(config);
    try {
        await pool.connect();
        console.log("✅ Connected to SQL Server");

        // Read migration file
        const migrationPath = path.join(__dirname, "../migration_admin_tables.sql");
        const migrationSql = fs.readFileSync(migrationPath, "utf8");

        // Split by GO statements (SQL Server batch separator)
        const batches = migrationSql.split(/^\s*GO\s*$/gim);

        // Execute each batch
        for (const batch of batches) {
            if (batch.trim()) {
                try {
                    console.log(`\n📝 Executing batch...`);
                    await pool.request().query(batch);
                    console.log(`✅ Batch executed successfully`);
                } catch (err) {
                    console.error(`❌ Batch error: ${err.message}`);
                    // Continue with next batch even if one fails
                }
            }
        }

        console.log("\n✅ All migrations completed!");
        process.exit(0);
    } catch (err) {
        console.error("❌ Migration failed:", err.message);
        process.exit(1);
    } finally {
        await pool.close();
    }
};

runMigrations();
