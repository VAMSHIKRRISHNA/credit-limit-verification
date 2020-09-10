const http = require('http'); // Importing the http module to create server
const path = require('path'); // Importing the path module to normalise path
const readFile = require('./service/readFile');
const port = process.env.PORT || 8000;

const {
    changeFormatToJSON,
    calcCombinedUtil,
    logCreditBreach
} = require('./helper/helper');


const server = http.createServer((req, res) => {
    // Getting the data file path 
    const filePath = path.join(__dirname, './data/data.csv');

    readFile(filePath).then(fileData => {
        const jsonHierarchieData = changeFormatToJSON(fileData, '');
        calcCombinedUtil(jsonHierarchieData)
        .then(result => {
            const output = logCreditBreach(result);
            res.writeHead(200, { 'Content-Type': 'text/html'});
            res.end(output);
        }, (err) => {
            res.status(404, { 'Content-Type': 'text/plain'});
            res.end('File not found');
        })
    }, (err) => {
        res.writeHead(404, { 'Content-Type': 'text/plain'});
        res.end('File not found');
    })
    .catch(error => {
        console.error(error);
        res.writeHead(404, { 'Content-Type': 'text/plain'});
        res.end();
    });
});


server.listen(port, '127.0.0.1', () => {
    console.log(`Listening server on port ${port}`);
});

module.exports = server;


