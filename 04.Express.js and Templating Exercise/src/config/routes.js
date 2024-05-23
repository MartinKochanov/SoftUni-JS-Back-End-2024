const { notFound } = require('../controllers/404');
const { about } = require('../controllers/aboutController');
const { home, details, searchGet } = require('../controllers/catalogController');
const { createGet, createPost } = require('../controllers/movieController');


const router = require('express').Router();

router.get('/', home);
router.get('/details/:id', details);
router.get('/about', about);
router.get('/create', createGet);
router.post('/create', createPost);
router.get('/search', searchGet)
router.get('*', notFound);


module.exports = { router }