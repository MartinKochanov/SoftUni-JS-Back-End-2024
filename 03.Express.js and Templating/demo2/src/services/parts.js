const data = require('../../data/catalog.json');

let nextid = 6;

function getParts() {
    return data;
}

function getPartById(id) {
    return data.find(p => p.id === Number(id));
}

function createPart(partData) {
    const part = {
        id: nextid++,
        name: partData.name,
        price: Number(partData.price),
        description: partData.description

    }

    data.push(part);

    return part;
}

function updatePart(id, partData) {
    const part = getPartById(id);

    part.name = partData.name;
    part.price = Number(partData.price);
    part.stock = Number(partData.stock);
    part.description = partData.description;

    return part;
}

module.exports = {
    getParts,
    getPartById,
    createPart,
    updatePart
}