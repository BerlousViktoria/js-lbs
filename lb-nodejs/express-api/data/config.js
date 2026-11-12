const mysql = require('mysql2');

const config = {
    host : 'localhost',
    port: 3306,
    user : 'root',
    password : '1234',
    database : 'api',
};

const pool = mysql.createPool(config);

module.exports = pool;