
const fs = require('fs'); // Include fs module 

// Calling the readFile() method to read 'data.csv' file 
async function readFile(path) {
    return new Promise((resolve, reject) => {
        fs.readFile(path, 'utf8', function (err, data) {
        if (err) {
            reject(err);
        }
        resolve(data);
        });
    });
}

module.exports = readFile;