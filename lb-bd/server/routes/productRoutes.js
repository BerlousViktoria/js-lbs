const express = require('express');
const router = express.Router();
const pool = require('../config/db');

router.get('/', async (request, response) => {
    try{
        const [rows] = await pool.query('SELECT * FROM products');
        response.json(rows);
    } catch (error){
        console.error(error);
        response.status(500).json({message: 'Помилка при отриманні товарів'});
    }
});


module.exports = router;