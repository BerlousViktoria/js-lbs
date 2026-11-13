const mysql = require('mysql2/promise');
require('dotenv').config();

const dbConfig = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 3306,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10
};

const pool = mysql.createPool(dbConfig);

pool.getConnection()
    .then(connection => {
        console.log(`Connection to DB is successful!`);
        connection.release();
    })
    .catch(err => {
        console.error(`Unable to connect to DB: ${err.message}`);
    });

module.exports = pool;

// нотатки:
//      waitForConnection: true, - якщо буде більше 10 підключень, то 11-й буде чекати, доки виконаються попередні
//      connectionLimit: 10      - встановлення ліміту на підключення до бази даних
//      .release()               - позначення з'єднання з бд "вільним", бо коли виконується pool.getConnection, 
//                                 то тоді воно стає недоступним для інших підключень