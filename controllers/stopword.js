sw = require('stopword');

const oldString = 'sdfgrdthyjutk'.split(' ')
const newString = sw.removeStopwords(oldString);
console.log("hi");
console.log(newString);
 var x = newString.toString();
 console.log(x)
