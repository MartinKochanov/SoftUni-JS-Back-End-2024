const { getAllMovies, getMovieById } = require("../services/movieService");

module.exports = {
    home: async (req, res) => {
        const movies = await getAllMovies();

        for (const movie of movies) {
            movie.isAuthor = req.user && req.user.id == movie.author.toString();
        }
        res.render('home', { movies });
    },
    details: async (req, res) => {
        const id = req.params.id;
        const movie = await getMovieById(id);

        if (!movie) {
            res.render('404');
            return;
        }

        movie.isAuthor = req.user && req.user.id == movie.author.toString();
        

        movie.starRating = '&#x2605'.repeat(movie.rating);

        res.render('details', { movie });
    },
    searchGet: async (req, res) => {

        let movies = await getAllMovies();

        if (req.url === '/search') {
            res.render('search', { movies });
        } else {

            const title = req.query.search;
            const genre = req.query.genre;
            const year = req.query.year;

            movies = filterMovies(movies, title, genre, year);

            res.render('search', { movies })

        }
    },
}

function filterMovies(movies, title, genre, year) {

    let filteredMovies = movies;

    if (year) {
        filteredMovies = filteredMovies.filter(movie => movie.year === Number(year));
    }

    if (genre) {
        filteredMovies = filteredMovies.filter(movie => movie.genre.toLowerCase() === genre.toLowerCase());
    }

    if (title) {
        filteredMovies = filteredMovies.filter(movie => movie.title.toLowerCase().includes(title.toLowerCase()));
    }

    return filteredMovies;
}