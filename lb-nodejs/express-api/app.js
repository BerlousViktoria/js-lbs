const routes = require('./routes/routes.js');

const bodyParser = require('body-parser');
const express = require('express');
const port = 3002;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true,
}));

// app.get('/', (request, response) => {
//     console.log(`URL: ${request.url}`);
//     response.send({message: 'Node.js and Express REST API'});
// });

routes(app);

const server = app.listen(port, (error) => {
    if (error) return console.log(`Eroror: ${error}`);
    console.log(`Server is listening on port http://localhost:${port}`)
});