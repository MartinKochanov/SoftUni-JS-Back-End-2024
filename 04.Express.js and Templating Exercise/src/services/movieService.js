const { Movie } = require('../models/Movie');


async function getAllMovies() {
    return await Movie.find().lean();
}

async function getMovieById(id) {
    return await Movie.findById(id).lean().populate('cast');
}

async function createMovie(movieData, authorId) {


    const movie = new Movie({
        title: movieData.title,
        genre: movieData.genre,
        director: movieData.director,
        year: Number(movieData.year),
        rating: Number(movieData.rating),
        description: movieData.description,
        imgURL: movieData.imgURL,
        author: authorId
    });

    return await movie.save();
}

async function attachCastToMovie(movieId, castId, userId) {

    const movie = await Movie.findById(movieId);

    if (!movie) {
        throw new Error(`Movie ${movieId} not found!`);
    }

    if(movie.author.toString() != userId) {
        throw new Error(`Access denied!`);

    }

    movie.cast.push(castId);

    await movie.save();

    return movie;
}

async function updateMovie(movieId, userId, movieData) {
    const movie = await Movie.findById(movieId);

    if (!movie) {
        throw new Error(`Movie ${movieId} not found!`);
    }

    if(movie.author.toString() != userId) {
        throw new Error(`Access denied!`);

    }

    movie.title = movieData.title;
    movie.genre = movieData.genre;
    movie.director = movieData.director;
    movie.year = Number(movieData.year);
    movie.rating = Number(movieData.rating);
    movie.description = movieData.description;
    movie.imgURL = movieData.imgURL;

    await movie.save();

    return movie;
}

async function deleteMovie(movieId, userId) {
    const movie = await Movie.findById(movieId);

    if (!movie) {
        throw new Error(`Movie ${movieId} not found!`);
    }

    if(movie.author.toString() != userId) {
        throw new Error(`Access denied!`);
    }

    await Movie.findByIdAndDelete(movieId);
}

module.exports = {
    getAllMovies,
    getMovieById,
    createMovie,
    attachCastToMovie,
    updateMovie,
    deleteMovie
}