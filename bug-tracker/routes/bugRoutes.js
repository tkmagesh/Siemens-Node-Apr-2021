var express = require('express'),
    router = express.Router(),
    bugDb = require('../services/bugDb');
   

/* 
var bugsList = [
    {id : 1, name : 'Server communication failure', isClosed : false, createdAt : new Date()},
    {id : 2, name : 'User actions not recognized', isClosed : true, createdAt : new Date()},
    {id : 3, name : 'Application not responding', isClosed : false, createdAt : new Date()},
]; 
*/


router.get('/', function(req, res, next){
    fs.readFile(dbFile, { encoding : 'utf8'}, function(err, fileContents){
        if (err){
            return res.sendStatus(500);
        };
        var bugs = JSON.parse(fileContents);
        res.json(bugs);
    })
    
});

router.get('/:id', function(req, res, next){
    var id = parseInt(req.params.id);
    //var bug = bugsList.find(function(b){ return b.id === id});
    fs.readFile(dbFile, { encoding : 'utf8'}, function(err, fileContents){
        if (err){
            return res.sendStatus(500);
        };
        var bugs = JSON.parse(fileContents);
        var bug = bugs.find(b => b.id === id);
        if (!bug){
            res.sendStatus(404)
        } else {
            res.json(bug);
        }
    });
});

router.post('/', function(req, res, next){

    fs.readFile(dbFile, { encoding : 'utf8'}, function(err, fileContents){
        if (err){
            return res.sendStatus(500);
        };
        var bugs = JSON.parse(fileContents);
        var bugData = { ...req.body };
        bugData.id = bugs.reduce((result, bug) => result > bug.id ? result : bug.id, 0) + 1;
        bugs.push(bugData);
        fs.writeFile(dbFile, JSON.stringify(bugs), {encoding : 'utf8'}, function(err){
            if (err){
                return res.sendStatus(500);
            }
            res.status(201).json(bugData);
        });
    });
    
    
})

router.put('/:id', function(req, res, next){
    var id = parseInt(req.params.id);
    var existingBug = bugsList.find(bug => bug.id === id);
    if (!existingBug){
        return res.sendStatus(404);
    }
    var updatedBug = { ...req.body};
    bugsList = bugsList.map(bug => bug.id === id ? updatedBug : bug);
    res.json(updatedBug);
});

router.patch('/:id', function(req, res, next){
    var id = parseInt(req.params.id);
    var existingBug = bugsList.find(bug => bug.id === id);
    if (!existingBug){
        return res.sendStatus(404);
    }
    var updatedBug = { ...existingBug, ...req.body};
    bugsList = bugsList.map(bug => bug.id === id ? updatedBug : bug);
    res.json(updatedBug);
});

router.delete('/:id', function(req, res, next){
    var id = parseInt(req.params.id);
    var existingBug = bugsList.find(bug => bug.id === id);
    if (!existingBug){
        return res.sendStatus(404);
    }
    
    bugsList = bugsList.filter(bug => bug.id !== id);
    res.sendStatus(200);
});

/* route configurations */
module.exports = router;