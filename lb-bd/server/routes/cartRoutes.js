const express = require('express');
const router = express.Router();
const pool = require('../config/db');

router.get('/', async (request, response) => {
    try {
        const sql = `
            SELECT 
                cart_items.id,
                cart_items.product_id,
                cart_items.quantity AS amount,
                products.name,
                products.image_url AS image,
                products.discount,
                products.price
            FROM cart_items
            JOIN products ON cart_items.product_id = products.id
        `;
        const [rows] = await pool.query(sql);
        response.json(rows);
    } catch (error) {
        console.error(error);
        response.status(500).json({ message: 'Помилка при завантаженні кошика' });
    }
});

router.post('/', async (request, response) => {
    try {
        const { product_id, quantity = 1 } = request.body;

        const [is_here] = await pool.query(
            'SELECT * FROM cart_items WHERE product_id = ?',
            [product_id]
        );

        if (is_here.length > 0) {
            await pool.query(
                'UPDATE cart_items SET quantity = quantity + ? WHERE product_id = ?',
                [quantity, product_id]
            );
        } else {
            await pool.query(
                'INSERT INTO cart_items (product_id, quantity) VALUES (?, ?)',
                [product_id, quantity]
            );
        }

        response.status(201).json({ message: `Додано до кошика товар id ${product_id} (x${quantity})` });
    } catch (error) {
        console.error(error);
        response.status(500).json({ message: `Помилка при додаванні товару id ${request.body.product_id}` });
    }
});

router.patch('/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const { quantity } = request.body;

        const [is_here] = await pool.query(
            'SELECT * FROM cart_items WHERE id = ?',
            [id]
        );

        if (is_here.length > 0 && quantity > 0 && quantity < 100) {
            await pool.query(
                'UPDATE cart_items SET quantity = ? WHERE id = ?',
                [quantity, id]
            );
            response.status(200).json({ message: `Кількість товару ${id} було успішно оновлено` });
        } else {
            return response.status(400).json({ message: 'Некоректна кількість (має бути від 1 до 99) або товар не знайдено' });
        }
    } catch (error) {
        console.error(error);
        response.status(500).json({ message: `Помилка при оновленні кількості товару id ${request.params.id}` });
    }
});

router.delete('/:id', async (request, response) => {
    try {
        const { id } = request.params;

        const [is_here] = await pool.query(
            'SELECT * FROM cart_items WHERE id = ?',
            [id]
        );

        if (is_here.length > 0) {
            await pool.query(
                'DELETE FROM cart_items WHERE id = ?',
                [id]
            );
            response.status(200).json({ message: `Товар з id ${id} видалено з кошика` });
        } else {
            return response.status(404).json({ message: `Товар за вказаним id (${id}) не існує` });
        }
    } catch (error) {
        console.error(error);
        response.status(500).json({ message: `Помилка при видаленні товару id ${request.params.id}` });
    }
});

module.exports = router;