var StartCol = require('./fireStarter');

console.log("process.argv : " + JSON.stringify(process.argv))
var args = process.argv.splice(2);
var logger;
console.log("args : " + JSON.stringify(args))


if(args.length < 1) {
    console.log("usage: node " + process.argv[1] + " <configuration> ");
    
    process.exit(0);
}


var startCol = new StartCol(args);
startCol.masterProc();