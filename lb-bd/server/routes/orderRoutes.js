const express = require('express');
const router = express.Router();
const pool = require('../config/db');


router.post('/', async (request, response) => {
    try {
        const sql = `
            SELECT 
                products.name,
                products.price,
                products.discount,
                cart_items.quantity AS amount
            FROM cart_items
            JOIN products ON cart_items.product_id = products.id
        `;
        const [items] = await pool.query(sql);

        if(items.length === 0){
            return response.status(400).json({message: `Кошик порожній`})
        }

        const totalPrice = items.reduce((sum, item) => {
            return sum + (Number(item.price) * item.amount);
        }, 0);

        const [result] = await pool.query(
            'INSERT INTO orders (items, total_price) VALUES (?, ?)',
            [JSON.stringify(items), totalPrice]
        )

        await pool.query('DELETE FROM cart_items');

        response.status(201).json({
            message: 'Замовлення успішно оформлено!',
            orderId: result.insertId,
            totalPrice: totalPrice
        })


    } catch (error) {
        console.error(error);
        response.status(500).json({ message: 'Помилка при оформленні замовлення' });
    }
});

router.get('/', async (request, response) => {
    try{
        const sql = `
            SELECT
                orders.id,
                orders.items,
                orders.total_price
                orders.create_at
            FROM orders
            ORDER BY orders.created_at DESC
        `;

        const[rows] = await pool.query(sql);
        return response.status(200).json(rows);

    } catch(error){
        console.error(error);
        response.status(500).json({message: 'Помилка при поверненні списку замовлень'});
    }
});

module.exports = router;