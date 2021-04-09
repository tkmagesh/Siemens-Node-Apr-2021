var path = require('path'),
 fs = require('fs');

var dbFile = path.join(__dirname, '../db/db.json');

//Using promises
function readAll(){
    return new Promise(function(resolveFn, rejectFn){
        fs.readFile(dbFile, { encoding : 'utf8'}, function(err, fileContents){
            if (err){
                return rejectFn(err)
            };
            var bugs = JSON.parse(fileContents);
            return resolveFn(bugs);
        })
    });
}

function save(bugs){
    return new Promise(function(resolveFn, rejectFn){
        fs.writeFile(dbFile, JSON.stringify(bugs), {encoding : 'utf8'}, function(err){
            if (err){
                return rejectFn(err);
            }
            resolveFn();
        });
    });
}

//Using callbacks
/* function readAll(callback){
    fs.readFile(dbFile, { encoding : 'utf8'}, function(err, fileContents){
        if (err){
            return callback(err, null)
        };
        var bugs = JSON.parse(fileContents);
        return callback(null, bugs);
    })
}

function save(bugs, callback){
     fs.writeFile(dbFile, JSON.stringify(bugs), {encoding : 'utf8'}, function(err){
        if (err){
            return callback(err);
        }
        callback();
    });
} */

module.exports = { readAll, save };