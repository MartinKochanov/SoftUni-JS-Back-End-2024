const { Cast } = require("../models/Cast");
const { Movie } = require("../models/Movie");
const { getMovieById } = require("./movieService");

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

async function getCastById(id) {
    return await Cast.findById(id).lean();
}

async function attachCastToMovie(movieId, castId) {

    try {
        await Movie.findByIdAndUpdate(movieId,
            { $push: { cast: castId } },
            { new: true, useFindAndModify: false }
        );
    } catch (err) {
        return false;
    }

    try {
        Cast.findByIdAndUpdate(castId,
            { $set: { movie: movieId } },
            { new: true, useFindAndModify: false }
        );

    } catch (error) {
        return false;
    }

    return true;

}


module.exports = { getAllCasts, createCast, attachCastToMovie, getCastById }