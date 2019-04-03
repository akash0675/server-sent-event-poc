const fs = require('fs');
const uuid = require('uuid');
const path = require('path');

// const stream = fs.createWriteStream(path.join(__dirname, './demo-files/abc.txt'));

setInterval(function() {
  fs.appendFile(path.join(__dirname, './demo-files/abc.txt'), uuid.v4() + '\n', function (err) {
    if (err) throw err;
    console.log('It\'s saved!');
  });
}, 10000);