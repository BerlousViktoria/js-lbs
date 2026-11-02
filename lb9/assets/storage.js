import { openDB, deleteDB } from 'https://cdn.jsdelivr.net/npm/idb@8/+esm'

async function createDB(){
    const db = await openDB('todo-db', 2, {
        upgrade(db){
            console.log("Creating db...")
            if (!db.objectStoreNames.contains('note')) {
                db.createObjectStore('note', { keyPath: 'id', autoIncrement: true });
            }
        }
    });
    console.log("DB is created", db);
}

createDB();