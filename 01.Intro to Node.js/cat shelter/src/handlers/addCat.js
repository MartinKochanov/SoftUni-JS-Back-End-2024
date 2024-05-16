const {readTemplate, layout} = require('../util');
const {getBreeds} = require('../model')

function breedFragment(breed) {
    return `<option value="${breed}">${breed}</option>`
}

async function addCatHandler(req, res ) {
    const template = await readTemplate('addCat');

    const breeds = await getBreeds();

    const html = template.replace('%%breeds%%', breeds.map(breedFragment).join('\n'));

    res.writeHead(200, {
        'content-type': 'text/html'
    });

    res.write(await layout(html));
    res.end();
}

module.exports = {
    addCatHandler
}