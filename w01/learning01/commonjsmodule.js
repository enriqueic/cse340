export function myFunction(){
    console.log("Hello, World!");
}

function myFunction2(){
    console.log("This is my second function.");
}

myFunction();
module.exports.mysecondFunction = myFunction2;

function myFunction3(){
    console.log("This is my third function.");
}
