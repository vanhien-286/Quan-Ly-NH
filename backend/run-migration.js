const { pool } = require("./config/db");
const fs = require("fs");
const sql = require("mssql");

async function runMigration() {
    try {
        await pool.connect();
        console.log("✅ Kết nối database DACCJS thành công\n");

        // Đọc file migration
        const migrationSQL = fs.readFileSync(
            "../migration_admin_tables.sql", 
            "utf8"
        );

        // Chia thành từng cmd (vì SQL Server cần GO để tách batch)
        const batches = migrationSQL.split("GO").filter(batch => batch.trim());

        for (let i = 0; i < batches.length; i++) {
            const batch = batches[i].trim();
            if (!batch) continue;

            try {
                await pool.request().batch(batch);
                console.log(`✅ Batch ${i + 1} hoàn thành`);
            } catch (err) {
                console.log(`⚠️ Batch ${i + 1}: ${err.message}`);
            }
        }

        console.log("\n✅ Migration hoàn thành!");
        await pool.close();
        process.exit(0);

    } catch (err) {
        console.error("❌ Lỗi migration:", err.message);
        process.exit(1);
    }
}

runMigration();
