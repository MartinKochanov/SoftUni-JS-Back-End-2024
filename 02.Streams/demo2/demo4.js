const fs = require('fs');

const writer = fs.createWriteStream('./demo2/output.txt')

process.stdin.pipe(writer)