const { Movie } = require('../models/Movie');


async function getAllMovies() {
    return await Movie.find().lean();
}

async function getMovieById(id) {

    return await Movie.findById(id).lean();

    
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


module.exports = {
    getAllMovies,
    getMovieById,
    createMovie
}