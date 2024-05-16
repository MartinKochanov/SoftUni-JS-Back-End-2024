const http = require('http');
const homeTemplate = require('./views/home');
const addCatTemplate = require('./views/add-cat.html')
const addBreedTemplate = require('./views/add-breed.html')
const errorTemplate = require('./views/error.html')
const editCatTemplate = require('./views/edit-cat.html')
const siteCss = require('./views/site.css');
const querystring = require('querystring');

let initialId = 4;
const cats = [
    {
        id: 1,
        name: 'Tommy',
        upload: 'https://ichef.bbci.co.uk/news/976/cpsprodpb/12A9B/production/_111434467_gettyimages-1143489763.jpg',
        breed: 'Bombay Cat',
        description: 'Dominant and aggressive to other cats. Will probably eat you in your sleep. Very cute tho.',
    },
    {
        id: 2,
        name: 'Navcho',
        upload: 'https://ichef.bbci.co.uk/news/976/cpsprodpb/12A9B/production/_111434467_gettyimages-1143489763.jpg',
        breed: 'Persian Cat',
        description: 'Nabuchadnezzar II',
    },
    {
        id: 3,
        name: 'Sisa',
        upload: 'https://ichef.bbci.co.uk/news/976/cpsprodpb/12A9B/production/_111434467_gettyimages-1143489763.jpg',
        breed: 'Bombay Cat',
        description: 'Dominant and aggressive to other cats. Will probably eat you in your sleep. Very cute tho.',
    }
]

const catBreeds = [];

cats.forEach(cat => {
    if (catBreeds.indexOf(cat.breed) < 0) {
        catBreeds.push(cat.breed);
    }
})


const server = http.createServer((req, res) => {


    switch (true) {

        case req.url === '/':
            res.writeHead(200, {
                'content-type': 'text/html',
            });

            res.write(homeTemplate(cats));
            res.end();
            break;

        case req.url === '/styles/site.css':
            res.writeHead(200, {
                'content-type': 'text/css'
            });

            res.write(siteCss);
            res.end();
            break;

        case req.url === '/cats/add-cat':


            if (req.method === 'GET') {
                res.writeHead(200, {
                    'content-type': 'text/html',
                });

                res.write(addCatTemplate(catBreeds));
                res.end();

            } else if (req.method === 'POST') {
                let data = '';

                req.on('data', chunk => {
                    data += chunk.toString();

                });

                req.on('end', () => {

                    const parsedData = querystring.parse(data);

                    parsedData.id = initialId;
                    initialId++;

                    cats.push(parsedData);

                    res.writeHead(302, {
                        'Location': '/',
                    });

                    res.end();
                });
            }
            break;

        case req.url === '/cats/add-breed':
            if (req.method === 'GET') {
                res.write(addBreedTemplate);
                res.end();
            } else if (req.method === 'POST') {
                let data = '';

                req.on('data', chunk => {
                    data += chunk.toString();
                });

                req.on('end', () => {
                    const parsedData = querystring.parse(data);
                    const breed = parsedData.breed;

                    if (catBreeds.indexOf(breed) < 0) {
                        catBreeds.push(breed);
                    }

                    res.writeHead(302, {
                        'Location': '/',
                    });

                    res.end();
                })
            }

            break;

        case req.url.startsWith('/cats-edit/'):
            const id = Number(req.url.split('/')[2]);
            const cat = cats.find(cat => cat.id === id)

            if (req.method === 'GET') {


                res.writeHead(200, {
                    'content-type': 'text/html',
                });

                res.write(editCatTemplate(cat, catBreeds));

                res.end();
            } else if (req.method === 'POST') {

                let data = '';

                req.on('data', chunk => {
                    data += chunk.toString();
                })

                req.on('end', () => {
                    const updatedCat = querystring.parse(data);
                    
                    cat.name = updatedCat.name;
                    cat.description = updatedCat.description;
                    cat.upload = updatedCat.upload;
                    cat.breed = updatedCat.breed;
                    
                    res.writeHead(302, {
                        'Location': '/',
                    })

                    res.end()
                })
            }
            break;

        case req.url.startsWith('/cats-delete/'):

            const catToDeleteId = Number(req.url.split('/')[2]);
            const catToDelete = cats.find(cat => cat.id === catToDeleteId)

            const catToDeleteIndex = cats.indexOf(catToDelete);
            cats.splice(catToDeleteIndex, 1)

            res.writeHead(302, {
                'Location': '/',
            });

            res.end();
            break;
        default:
            res.writeHead(404, {
                'content-type': 'text/html',
            });
            res.write(errorTemplate)

            res.end();

    }
});

server.listen(5000);
console.log('Server is listening on port 5000...');
