var calculatorObject = {
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
};

function greet(name){
    return 'Hi ' + name + ', Have a nice day!';
}

module.exports = {
    calculator : calculatorObject,
    greet : greet
};
