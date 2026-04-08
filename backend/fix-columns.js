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

const runFix = async () => {
    const pool = new sql.ConnectionPool(config);
    try {
        await pool.connect();
        
        await pool.request().query(`
            IF NOT EXISTS (SELECT 1 FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = 'Dishes' AND COLUMN_NAME = 'ImageUrl')
            ALTER TABLE Dishes ADD ImageUrl NVARCHAR(MAX);
            
            IF NOT EXISTS (SELECT 1 FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = 'Dishes' AND COLUMN_NAME = 'Featured')
            ALTER TABLE Dishes ADD Featured BIT DEFAULT 0;
            
            IF NOT EXISTS (SELECT 1 FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = 'Dishes' AND COLUMN_NAME = 'IsVisible')
            ALTER TABLE Dishes ADD IsVisible BIT DEFAULT 1;
            
            IF NOT EXISTS (SELECT 1 FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = 'Dishes' AND COLUMN_NAME = 'Category')
            ALTER TABLE Dishes ADD Category NVARCHAR(50) DEFAULT N'Phở';
        `);
        
        console.log("✅ Fixed Columns");
        process.exit(0);
    } catch (err) {
        console.error("❌ Error:", err.message);
        process.exit(1);
    }
};

runFix();
