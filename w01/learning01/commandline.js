console.log("This is my first command-line application in Node.js");
console.log("\n");

const mymodule = require('./module.js');
mymodule.myFunction();
mymodule.mythirdFunction();

console.log("Global object: ");
console.log(global);