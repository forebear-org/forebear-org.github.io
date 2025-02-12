import sqlite3 from "sqlite3";

const db = createDatabase();
instantiateDatabase(db);

function createDatabase() {
    // Connecting to or creating a new SQLite database file
    const db = new sqlite3.Database(
        "./collection.db",
        sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
        (err) => {
            if (err) {
                return console.error(err.message);
            }
            console.log("Connected to the SQlite database.");
        }
    );

    return db;
}

function instantiateDatabase(db) {
    // Serialize method ensures that database queries are executed sequentially
    db.serialize(() => {
        // Create the items table if it doesn't exist
        db.run(
            `CREATE TABLE IF NOT EXISTS person (
            id INTEGER PRIMARY KEY,
            firstName TEXT,
            lastName TEXT,
            dateOfBirth DATE)`,
            (err) => {
                if (err) {
                    return console.error(err.message);
                }
                console.log("Created person table.");

                // Insert new data into the products table
                const values1 = [
                    "Albin",
                    "Kempe",
                    "2000-06-24",
                ];
                const values2 = [
                    "Elin",
                    "Inoue",
                    "1998-12-15",
                ];

                const insertSql = `INSERT INTO person(firstName, lastName, dateOfBirth) VALUES(?, ?, ?)`;

                db.run(insertSql, values1, function (err) {
                    if (err) {
                        return console.error(err.message);
                    }
                    const id = this.lastID; // get the id of the last inserted row
                    console.log(`Rows inserted, ID ${id}`);
                });

                db.run(insertSql, values2, function (err) {
                    if (err) {
                        return console.error(err.message);
                    }
                    const id = this.lastID; // get the id of the last inserted row
                    console.log(`Rows inserted, ID ${id}`);
                });

                //   Close the database connection after all insertions are done
                db.close((err) => {
                    if (err) {
                        return console.error(err.message);
                    }
                    console.log("Closed the database connection.");
                });
            }
        );
    });
}

export { createDatabase, instantiateDatabase };