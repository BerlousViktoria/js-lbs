const { response, request } = require("express");
const pool = require('../data/config');


const router = app => {
    app.get('/', (request, response) => {
        response.send({
            message: 'Node.js and Express REST API'
        });
    });

    app.get('/users/:id', (request, response) => {
        const id = request.params.id;

        pool.query('SELECT * FROM users WHERE id = ?', id, (error, result) => {
            if (error) throw error;

            response.send(result);
        });
    });    

    app.post('/users', (request, response) => {
        pool.query('INSERT INTO users SET ?', request.body, (error, result) => {
            if (error) throw error;

            response.status(201).send(`User added with ID: ${result.insertId}`);
        })
    })

    app.put('/users/:id', (request, response) => {
        const id = request.params.id;
        pool.query('UPDATE users SET ? WHERE id = ?', [request.body, id], (error, result) => {
            if (error) throw error;
            response.send('User update successfully');
        });
    });

    app.delete('/users/:id', (request, response) => {
        const id = request.params.id;
        pool.query('DELETE FROM users WHERE id = ?', id, (error, result) => {
            if (error) throw error;
            response.send('User deleted.');
        });
    });
}

const users = [{
        id : 1,
        name : "Richard Hendicks",
        email : "richard@piedpiper.com",
    },
    {
        id : 2,
        name : "Bertram Gilfoyle",
        email : "gilfoyle@piedpiper.com"
    },
];

module.exports = router;