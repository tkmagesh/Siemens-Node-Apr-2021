var calculatorModule = require('./calculator');
var calc = calculatorModule.calculator,
    greet = calculatorModule.greet;

console.log(greet('Magesh'));
var n1 = 100, n2 = 200;
console.log(calc.add(n1,n2));
console.log(calc.subtract(n1,n2));
console.log(calc.multiply(n1,n2));
console.log(calc.divide(n1,n2));