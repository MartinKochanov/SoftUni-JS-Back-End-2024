const { notFound } = require('../controllers/404');
const { about } = require('../controllers/aboutController');
const { attachGet, attachPost } = require('../controllers/attachController');
const { createCastGet, createCastPost } = require('../controllers/castController');
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
router.get('/attach/cast/:id', attachGet);
router.post('/attach/cast/:id', attachPost);
router.post('/create/cast', createCastGet);
router.get('/search', searchGet)
router.get('*', notFound);


module.exports = { router }