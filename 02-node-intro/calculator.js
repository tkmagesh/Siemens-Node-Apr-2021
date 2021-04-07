var calculator = {
    add(x,y){
        return x + y;
    },
    subtract(x,y){
        return x - y;
    },
    multiply(x,y){
        return x * y;
    },
    divide(x,y){
        return x / y;
    }
}
var n1 = 100, n2 = 200;
console.log(calculator.add(n1,n2));
console.log(calculator.subtract(n1,n2));
console.log(calculator.multiply(n1,n2));
console.log(calculator.divide(n1,n2));