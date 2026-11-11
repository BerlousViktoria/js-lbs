const { response } = require('express');
const http = require('http');
const port = 3001;
const server = http.createServer();

server.on('request', (req, res) => {
    console.log(`URL : ${req.url}`);
    res.end('Hello, server!');
});

server.listen(port, (error) => {
    if (error) return console.log(`Eror: ${error}`);
    console.log(`Server is listening on port ${port}`);
});