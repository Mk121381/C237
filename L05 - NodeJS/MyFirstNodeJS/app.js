const http = require('http');

const server = http.createServer((req, res) => {
    // res.end('Hello, World!\n'); // stop show (ctrl C)
    res.write('<h1>Welcome to my first Node.Js Page! </h1>');
    res.write('<b>Name: </b> ZhangMingke <br>');
    res.write('<b>School: </b> Repulic Polytechnic </br>');
    res.write('<b>Diploma: </b> IT Management solution');
});

const PORT = 3000;

server.listen(PORT, () => { 
    console.log('Server running at http://localhost:${PORT}/');
});