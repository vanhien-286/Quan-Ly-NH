const path = require('path');
require('dotenv').config(); 
const { pool, connectDB } = require('./config/db');
const sql = require("mssql");

async function migrate() {
    try {
        await connectDB();
        console.log("Connected to DB. Starting migration...");

        const query = `
            DECLARE @ConstraintName nvarchar(200);
            SELECT @ConstraintName = name FROM sys.check_constraints 
            WHERE parent_object_id = OBJECT_ID('Reservations') AND definition LIKE '%Status%';

            IF @ConstraintName IS NOT NULL
            BEGIN
                EXEC('ALTER TABLE Reservations DROP CONSTRAINT ' + @ConstraintName);
                PRINT 'Dropped old constraint: ' + @ConstraintName;
            END

            ALTER TABLE Reservations ADD CONSTRAINT CK_Reservations_Status 
            CHECK (Status IN ('Pending', 'Confirmed', 'Cancelled', 'Completed'));
            PRINT 'Added new constraint CK_Reservations_Status';
        `;

        await pool.request().query(query);
        console.log("Migration successful!");
        process.exit(0);
    } catch (err) {
        console.error("Migration failed:", err.message);
        process.exit(1);
    }
}

migrate();
