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
        movie: castData.movie
    })

    await cast.save();

    return cast;
}

async function getCastById(id) {
    return await Cast.findById(id).lean();
}



module.exports = { getAllCasts, createCast, getCastById }