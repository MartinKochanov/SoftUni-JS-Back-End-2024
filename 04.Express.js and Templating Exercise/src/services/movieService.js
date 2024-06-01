const { Movie } = require('../models/Movie');


async function getAllMovies() {
    return await Movie.find().lean();
}

async function getMovieById(id) {
    return await Movie.findById(id).lean().populate('cast');
}

async function createMovie(movieData) {


    const movie = new Movie({
        title: movieData.title,
        genre: movieData.genre,
        director: movieData.director,
        year: Number(movieData.year),
        rating: Number(movieData.rating),
        description: movieData.description,
        imgURL: movieData.imgURL,
    });

    return await movie.save();
}

async function attachCastToMovie(movieId, castId) {

    const movie = await Movie.findById(movieId);

    if (!movie) {
        throw new Error(`Movie ${movieId} not found!`);
    }

    movie.cast.push(castId);

    await movie.save();

    return movie;
}


module.exports = {
    getAllMovies,
    getMovieById,
    createMovie,
    attachCastToMovie
}