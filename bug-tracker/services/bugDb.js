var path = require('path'),
 fs = require('fs');

var dbFile = path.join(__dirname, '../db/db.json');

function readAll(){
    //read the bugs from the file and return
}

function save(bugs){
    //write the bugs into the file
}

module.exports = { readAll, save };