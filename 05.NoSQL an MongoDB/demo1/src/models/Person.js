const mongoose = require('mongoose');

const contactInfoSchema = new mongoose.Schema({
    tel: String,
    email: String
})

const personSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'required']
    },
    lastName: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        min: 0,
        max: 199
    },
    contacts: contactInfoSchema
})

personSchema.methods.sayHello = function () {
    return `${this.firstName} says hello`;
}

personSchema.virtual('fullName').get(function () {
    return this.firstName + ' ' + this.lastName;
}).set(function (value) {
    const [first, last] = value.split(' ');
    this.firstName = first;
    this.lastName = last;
})

personSchema.path('firstName').validate(function (value) {
    return value.length >= 2 && value.length <= 10;
}, 'First name must be between 2 and 10 characters long!')

const Person = mongoose.model('Person', personSchema);

module.exports = { Person }