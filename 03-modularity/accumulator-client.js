var accumulatorFactory = require('./accumulator');

var accumulator = accumulatorFactory();
accumulator.add(100);
accumulator.subtract(50);
accumulator.multiply(10);
accumulator.divide(2);
console.log(accumulator.getResult());

var acc2 = accumulatorFactory(1000);
console.log(acc2.getResult());