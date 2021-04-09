var path = require('path'),
 fs = require('fs'),
 fsPromises = require('fs/promises');

var dbFile = path.join(__dirname, '../db/db.json');

//if using node 14+
//using fs/promises
/* async function readAll(){
    var fileContents = await fsPromises.readFile(dbFile, { encoding : 'utf8'})
    var bugs = JSON.parse(fileContents);
    return resolveFn(bugs);
}

async function save(bugs){
    await fsPromises.writeFile(dbFile, JSON.stringify(bugs), {encoding : 'utf8'})
} */

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