const { createPart, getPartById, updatePart } = require("../services/parts");

module.exports = {
    createController: {
        get: (req, res) => {
            res.render('create');
        },
        post: (req, res) => {

            const { name, price, description } = req.body;

            if (!name || !price || description) {
                //Missing fields
                res.render('create', { name, price, description, error: { name: !name, price: !price, description: !description } });

                return;
            }

            createPart(req.body);
            res.redirect('/catalog')
        }
    },
    editController: {
        get: (req, res) => {
            const { id } = req.params;
            const partData = getPartById(id);

            if (!partData) {
                res.redirect('/404')
            }

            res.render('edit', partData);
        },
        post: (req, res) => {
            const { id } = req.params;
            const { name, price, stock, description } = req.body;

            if (!name || !price || !stock || !description) {
                //Missing fields
                res.render('edit', { name, price, description, error: { name: !name, price: !price, stock: !stock, description: !description } });

                return;
            }

            const result = updatePart(id, req.body);

            res.redirect('/catalog/' + result.id)
        }
    }
};