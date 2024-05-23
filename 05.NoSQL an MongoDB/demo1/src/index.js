const mongoose = require('mongoose');
const { Person } = require('./models/Person')

async function start() {
    const connectioString = 'mongodb://localhost:27017/testdb';
    await mongoose.connect(connectioString);

    console.log('Database connected');

    const bob = await Person.findOne({firstName: 'Bob'});
    console.log(bob);
    mongoose.disconnect();
}

start();
