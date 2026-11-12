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