// const { subscribe, unsubscribe } = require('./bus');

const { emitter } = require("./emitter");

function start() {
    emitter.on('login', onMessage)
}

function onMessage(data) {
    console.log('Second Received message from bus:', data);
}

function unsub() {
    emitter.off('login', onMessage);
}
module.exports = { start, unsub }