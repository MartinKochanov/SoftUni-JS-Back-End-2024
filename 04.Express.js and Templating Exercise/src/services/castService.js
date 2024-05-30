const { Cast } = require("../models/Cast");

async function getAllCasts() {
    return await Cast.find().lean();
}

async function createCast(castData) {

    const cast = new Cast({
        name: castData.name,
        age: castData.age,
        born: castData.born,
        nameInMovie: castData.nameInMovie,
        imageUrl: castData.imageUrl,
        movie: null
    })

    await cast.save()
}

module.exports = { getAllCasts, createCast }