import { createDatabase } from "./db_create"

const db = createDatabase();

function getAllPeople() {
    return db.all("SELECT * FROM person");
}

export { getAllPeople };