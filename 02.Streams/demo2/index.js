const { createServer } = require('http');
const fs = require('fs');

createServer(
    (req, res) => {
        if (req.method === 'GET') {

            const reader = fs.createReadStream('./demo2/index.html');
            reader.pipe(res);

        } else if (req.method === 'POST') {

            const writer = fs.createWriteStream('./demo2/client_log.txt');
            req.pipe(writer).on('close', () => {
                res.statusCode = 204;
                res.end();
            })

        }
    }
)
    .listen(3000);