const { Schema, model } = require('mongoose');


const userShcema = new Schema({
    email: {
        type: String,
        required: true,
    },
    passsword: {
        type: String,
        required: true
    },
}, {
    collation: {
        locale: 'en',
        strength: 2
    }
})

const User = model('User', userShcema);

module.exports = {
    User
}