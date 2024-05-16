const { readTemplate, layout } = require('../util');

async function addBreedHandler(req, res) {
    const template = await readTemplate('addBreed');

    res.writeHead(200, {
        'content-type': 'text/html'
    })
    res.write(await layout(template));
    res.end();
}

async function postBreedHandler(req, res) {
    let data = '';
    req.on('data', (chunk) => {
        data += chunk;
    });

    req.on('end', () => {
        console.log(new URLSearchParams(data))
    })


    res.statusCode = 204;
    res.end();
}

module.exports = {
    addBreedHandler,
    postBreedHandler
}