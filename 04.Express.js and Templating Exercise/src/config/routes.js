const { notFound } = require('../controllers/404');
const { about } = require('../controllers/aboutController');
const { createCastGet, createCastPost, attachCastGet, attachCastPost } = require('../controllers/castController');
const { home, details, searchGet } = require('../controllers/catalogController');
const { createGet, createPost } = require('../controllers/movieController');


const router = require('express').Router();

router.get('/', home);
router.get('/details/:id', details);
router.get('/about', about);
router.get('/create/movie', createGet);
router.post('/create/movie', createPost);
router.get('/create/cast', createCastGet);
router.post('/create/cast', createCastPost);
router.get('/attach/cast/:id', attachCastGet);
router.post('/attach/cast/:id', attachCastPost);
router.post('/create/cast', createCastGet);
router.get('/search', searchGet)
router.get('*', notFound);


module.exports = { router }