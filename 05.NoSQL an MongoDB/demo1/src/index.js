const mongoose = require('mongoose');
const { Person } = require('./models/Person');
const { Article } = require('./models/Article');

async function start() {
    const connectioString = 'mongodb://localhost:27017/testdb';
    await mongoose.connect(connectioString);

    console.log('Database connected');

    // const bob = await Person.findOne({ firstName: 'Bob' });

    // await Article.create({
    //     content: 'First article',
    //     author: bob
    // })

    // try {
    //     const result = await Person.findOneAndDelete().where('firstName').equals('Bob');
    //     console.log(result);
    // } catch (err) {
    //     console.log(err);
    // }

    
    try {
        const result = await Person.deleteOne().where('firstName').equals('Bob');
        console.log(result);
    } catch (err) {
        console.log(err);
    }
    mongoose.disconnect();
}

start();
