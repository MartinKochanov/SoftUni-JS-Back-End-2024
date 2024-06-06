const { Router } = require('express');
const { parseCookieData } = require('../util');

const router = Router();

router.get('/', (req, res) => {

    let useDark = false;

    const cockieData = req.headers['cookie'];
    if (cockieData) {
        const cookies = parseCookieData(cockieData);
        useDark = cookies.theme == 'dark';
    }

    req.session.message = 'hello';


    res.render('home', { useDark });
})


router.get('/set', (req, res) => {
    res.setHeader('Set-Cookie', 'my-cookie=hello');

    res.redirect('/');
})

router.get('/get', (req, res) => {
    const cookieData = req.headers['cookie'];
    console.log(cookieData);

    res.render('get')
});

router.get('/use-light', (req, res) => {
    res.setHeader('Set-Cookie', 'theme=light');

    res.redirect('/');
});

router.get('/use-dark', (req, res) => {
    res.setHeader('Set-Cookie', 'theme=dark');

    res.redirect('/');
});

module.exports = {
    router
}