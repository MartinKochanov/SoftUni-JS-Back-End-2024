const express = require('express');

const app = express();

const homeHtml = `
<h1>Home Page</h1>
<a href="/catalog">Catalog</a>
<a href="/">Home</a>
`;


const catalogHtml = `
<h1>Catalog Page</h1>
<a href="/catalog">Catalog</a>
<a href="/">Home</a>
`;

app.get('/', (req, res) => {
    res.send(homeHtml);
});

app.get('/data', (req, res) => {
    res.json({
        message: 'working',
        value: 5
    })
})


app.get('/catalog', (req, res) => {
    res.send(catalogHtml);
});



app.get('*', (req, res) => {
    res.status(404);
    res.send('404 File Not Found!')
})

app.listen(3000, () => {
    console.log('App is listening on port 3000');
});