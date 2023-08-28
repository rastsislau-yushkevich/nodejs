const http = require('http');
const fs = require('fs');
const path = require('path')

const PORT = 3000;

const server = http.createServer((req, res) => {
    let basePath;
    res.setHeader('Content-Type', 'text/html');

    const createPath = (page) => path.resolve(__dirname, 'views', `${page}.html`)

    switch(req.url) {
        case '/': 
        case '/home': 
        case '/index.html': 
            basePath = createPath('index');
            res.statusCode = 200;
            break;
        case '/about-us':
            res.statusCode = 301;
            res.setHeader('Location', '/contacts');
            res.end();
        case '/contacts':
            basePath = createPath('contacts');
            res.statusCode = 200;
            break;
        default:
            basePath = createPath('error');
            res.statusCode = 404;
            break;
    }

        fs.readFile(basePath, (err, data) => {
            if(err) {
                console.log('Error reading data');
                res.statusCode = 500;
                res.end();
            } else {
                res.end(data);
            }
        })
})

server.listen(PORT, (error) => {
    error ? console.log('error') : console.log('alles gut on localhost:3000');
})