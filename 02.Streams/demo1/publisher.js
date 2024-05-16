const { publish } = require('./bus');
const { emitter } = require('./emitter');

function start() {
    const data = [1, 2, 3];
    emitter.emit('ping', data);
    emitter.emit('login', {
        user: 'Perer',
        password: '123456'
    });
}

module.exports = { start };