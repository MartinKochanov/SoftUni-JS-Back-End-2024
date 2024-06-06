const { createMovie, getMovieById, updateMovie, deleteMovie } = require("../services/movieService");


module.exports = {
    createGet: (req, res) => {
        res.render('create')
    },
    createPost: async (req, res) => {

        const authorId = req.user.id

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

        const movie = await createMovie(req.body, authorId);
        res.redirect('/details/' + movie._id);
    },

    editGet: async (req, res) => {
        const movieId = req.params.id;

        let movie;
        try {
            movie = await getMovieById(movieId);

            if (!movie) {
                throw new Error('Movie not found');
            }
        } catch (error) {

            res.render('404');
            return;

        }

        const isAuthor = req.user.id == movie.author.toString();

        if (!isAuthor) {
            res.redirect('/login');
            return;
        }
        res.render('edit', { movie })
    },
    editPost: async (req, res) => {

        const movieId = req.params.id
        const userId = req.user.id

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
            res.render('edit', { movie: req.body, errors });
            return;
        }

        try {
            await updateMovie(movieId, userId, req.body)
        } catch (err) {
            if (err.message = 'Access denied!') {
                res.redirect('/login')
            } else {
                res.render('404')
            }
            return;
        }
        res.redirect('/details/' + movieId);
    },
    deleteGet: async (req, res) => {
        const movieId = req.params.id;

        let movie;
        try {
            movie = await getMovieById(movieId);

            if (!movie) {
                throw new Error('Movie not found');
            }
        } catch (error) {

            res.render('404');
            return;

        }

        const isAuthor = req.user.id == movie.author.toString();

        if (!isAuthor) {
            res.redirect('/login');
            return;
        }
        res.render('delete', { movie })
    },
    deletePost: async (req, res) => {
        const movieId = req.params.id;
        const userId = req.user.id;

        
        try {
            await deleteMovie(movieId, userId, req.body)
        } catch (err) {
            if (err.message = 'Access denied!') {
                res.redirect('/login')
            } else {
                res.render('404')
            }
            return;
        }
        res.redirect('/');
    }
}