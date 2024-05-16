const fs = require('fs');

const reader = fs.createReadStream('./demo2/index.html', { highWaterMark: 64 });
let data = '';

reader.on('data', (chunk) => {
    process.stdout.write(chunk.toString())
    // process.stdout.write('\n')
});

reader.on('end', () => {
    console.log('Finished');
    // console.log(data);
})