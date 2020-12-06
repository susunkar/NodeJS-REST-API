const http = require('http');
const app = require('./app');

const port = process.env.PORT || 3000;
const server = http.createServer(app).listen(port, () => { console.log("Server up and running http://localhost:3000/")});
