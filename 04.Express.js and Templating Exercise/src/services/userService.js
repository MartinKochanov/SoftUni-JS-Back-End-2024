const { User } = require('../models/User');
const bcrypt = require('bcrypt')
async function reqister(email, passsword) {

    const existing = await User.findOne({ email });

    if (existing) {
        throw new Error('Email is already used!');
    }

    const user = new User({
        email,
        passsword: await bcrypt.hash(passsword, 10)
    });

    await user.save();

    return user;
}

async function login(email, passsword) {

    const user = await User.findOne({ email });

    if (!user) {
        throw new Error('Incorrect email or password ');
    }

    const match = await bcrypt.compare(passsword, user.passsword);

    if (!match) {
        throw new Error('Incorrect email or password ');
    }

    return user;

}


module.exports = {
    login,
    reqister,
}