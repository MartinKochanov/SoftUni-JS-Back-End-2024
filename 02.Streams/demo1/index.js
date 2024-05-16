const { start: startSubscriber } = require('./subscriber')
const { start: startPublisher } = require('./publisher')
const { start: startSybscriber2, unsub } = require('./sub2')

function start() {
    startSubscriber();
    startSybscriber2()
    startPublisher();

    unsub();
    startPublisher();
}

start();