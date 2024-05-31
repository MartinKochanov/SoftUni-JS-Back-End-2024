const { Cast } = require('../models/Cast');
const { createCast, getAllCasts, attachCastToMovie } = require('../services/castService');
const { getMovieById } = require('../services/movieService');
module.exports = {
    createCastGet: (req, res) => {
        res.render('cast-create');
    },
    createCastPost: async (req, res) => {
        await createCast(req.body);
        res.redirect('/');
    },

    attachCastGet: async (req, res) => {

        const id = req.params.id;
        const cast = await getAllCasts();
        const movie = await getMovieById(id);

        res.render('cast-attach', { movie, cast })
    },
    attachCastPost: async (req, res) => {

        const movieId = req.params.id;
        const castId = req.body.cast;

        await attachCastToMovie(movieId, castId);

        res.redirect('/details/'+ movieId)
    }
}