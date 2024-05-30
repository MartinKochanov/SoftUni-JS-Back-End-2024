const { createMovie } = require("../services/movieService");


module.exports = {
    createGet: (req, res) => {
        res.render('create')
    },
    createPost: async (req, res) => {

        const errors = {
            title: !req.body.title,
            genre: !req.body.genre,
            director: !req.body.director,
            year: !req.body.year,
            imgURL: !req.body.imgURL,
            rating: !req.body.rating,
            description: !req.body.description,
        };

        if (Object.values(errors).includes(true)) {
            res.render('create', { movie: req.body, errors });
            return;
        }

        const movie = await createMovie(req.body);
        res.redirect('/details/' + movie._id);
    }
}