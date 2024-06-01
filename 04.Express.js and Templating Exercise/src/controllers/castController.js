const { Cast } = require('../models/Cast');
const { createCast, getAllCasts, attachCastToMovie } = require('../services/castService');
const { getMovieById } = require('../services/movieService');
module.exports = {
    createCastGet: (req, res) => {
        res.render('cast-create');
    },
    createCastPost: async (req, res) => {

        const errors = {
            name: !req.body.name,
            age: !req.body.age,
            born: !req.body.born,
            nameInMovie: !req.body.nameInMovie,
            imageUrl: !req.body.imageUrl,
        };

        if (Object.values(errors).includes(true)) {
            res.render('cast-create', { cast: req.body, errors });
            return;
        }
        const cast = await createCast(req.body);
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

        const attached = await attachCastToMovie(movieId, castId);

        if (!attached) {
            res.render('404')
        }

        res.redirect('/details/' + movieId)
    }
}