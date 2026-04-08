const { pool, connectDB } = require("./config/db");

async function checkFKs() {
    await connectDB();
    const result = await pool.request().query(`
        SELECT 
            fk.name AS ForeignKey,
            tp.name AS ParentTable,
            ref.name AS ReferencedTable
        FROM sys.foreign_keys fk
        INNER JOIN sys.tables tp ON fk.parent_object_id = tp.object_id
        INNER JOIN sys.tables ref ON fk.referenced_object_id = ref.object_id
    `);
    
    console.log("Current Foreign Keys:");
    console.table(result.recordset);
    process.exit(0);
}

checkFKs();
