const { readTemplate, layout } = require('../util');

async function editCatHandler(req, res) {
    const template = await readTemplate('editCat');

    res.writeHead(200, {
        'content-type': 'text/html'
    });

    res.write(await layout(template));

    res.end();
}

module.exports = {
    editCatHandler
}