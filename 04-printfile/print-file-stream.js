var fs = require('fs');

var stream = fs.createReadStream('./sample.txt', { encoding : 'utf8', highWaterMark : 32 * 1024});

//events - open, data, end, close, error

var readCount = 0;

stream.on('open', function(){
    console.log('file is opened for reading');
});

stream.on('data', function(chunk){
    ++readCount;
    console.log(chunk);
});

stream.on('end', function(){
    console.log('Thats all folks!');
    console.log('read completed with ' + readCount + ' chunks!');
});

stream.on('close', function(){
    console.log('file is closed');
});

stream.on('error', function(err){
    console.log('something went wrong!');
    console.log(err);
})

/* 
Abstract Classes
    ReadStream (Inherited from Stream.Readable)
    WriteStream (Inherited from Stream.Writable)

    Both of the above inherit EventEmitter
*/