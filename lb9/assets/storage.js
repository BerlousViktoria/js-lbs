import { openDB } from 'https://cdn.jsdelivr.net/npm/idb@8/+esm';

export async function initDB() {
    return await openDB('todo-db', 2, {
        upgrade(db) {
            if (!db.objectStoreNames.contains('note')) {
                db.createObjectStore('note', { keyPath: 'id', autoIncrement: true });
            }
        }
    });
}

export async function saveTaskToDB(taskText, date) {
    const db = await initDB();

    const id = await db.add('note', {
        text: taskText,
        date: date,
        completed: false
    });
    return id;
}

export async function getAllTasksFromDB() {
    const db = await initDB();
    return await db.getAll('note');
}