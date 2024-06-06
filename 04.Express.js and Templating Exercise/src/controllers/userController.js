const { createToken } = require("../services/tokenService");
const { reqister, login } = require("../services/userService");

module.exports = {
    registerGet: (req, res) => {
        res.render('register');
    },
    registerPost: async (req, res) => {
        const { email, password, repass } = req.body;

        try {
            if (!email || !password) {
                throw new Error('All fields are required!');
            }

            if (password != repass) {
                throw new Error('Password mismatch!')
            }

            const user = await reqister(email, password);
            const token = createToken(user);

            res.cookie('token', token, { httpOnly: true });

            res.redirect('/');

        } catch (err) {
            res.render('register', { data: { email }, error: err.message });
            return;
        }
    },
    loginGet: (req, res) => {
        res.render('login')
    },
    loginPost: async (req, res) => {
        const { email, password } = req.body;

        try {
            if (!email || !password) {
                throw new Error('All fields are required!');
            }


            const user = await login(email, password);
            const token = createToken(user);

            res.cookie('token', token, { httpOnly: true });

            res.redirect('/');

        } catch (err) {
            res.render('login', { data: { email }, error: err.message });
            return;
        }
    },
    logout: (req, res) => {
        res.clearCookie('token');
        res.redirect('/')
    }
}