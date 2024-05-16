const fs = require('fs');

const data = [1, 2, 3, 4, 5]

fs.writeFile('./demo2/data.json', JSON.stringify(data), (err) => {
    console.log('Write completed!');
});

const list = fs.readdirSync('./demo2')
console.log(list);

console.log('Code completed!');

