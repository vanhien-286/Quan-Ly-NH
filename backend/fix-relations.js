const { pool, connectDB } = require("./config/db");

async function fixRelations() {
    await connectDB();
    
    console.log("Cleaning up orphaned reservations (if any) before adding FKs...");
    
    await pool.request().query(`
        UPDATE Reservations
        SET UserID = NULL
        WHERE UserID IS NOT NULL AND UserID NOT IN (SELECT Id FROM Users)
    `);
    
    console.log("Adding Foreign Key from Reservations.UserID to Users.Id...");
    try {
        await pool.request().query(`
            ALTER TABLE Reservations
            ADD CONSTRAINT FK_Reservations_Users FOREIGN KEY (UserID)
            REFERENCES Users(Id) ON DELETE SET NULL
        `);
        console.log("✅ Added FK_Reservations_Users");
    } catch (e) {
        console.log("⚠️ " + e.message);
    }
    
    process.exit(0);
}

fixRelations();
