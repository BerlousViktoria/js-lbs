import { openDB } from 'idb';

async function createStoreInDB() {
    const dbPromise = await openDB('note-db', 1, {
        upgrade(db) {            
            db.createObjectStore('storeName', { keyPath: 'id', autoIncrement: true });
        }
    });
}

createStoreInDB();