const Tail = require('nodejs-tail');
const path = require('path');
 
const filename = path.join(__dirname, './demo-files/abc.txt');
const tail = new Tail(filename);
 
tail.on('line', (line) => {

  process.stdout.write(line);
})
 
tail.on('close', () => {
  console.log('watching stopped');
})
 
tail.watch();