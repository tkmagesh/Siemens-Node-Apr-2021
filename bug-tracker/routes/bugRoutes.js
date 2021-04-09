var express = require('express'),
    router = express.Router();

/* 
var bugsList = [
    {id : 1, name : 'Server communication failure', isClosed : false, createdAt : new Date()},
    {id : 2, name : 'User actions not recognized', isClosed : true, createdAt : new Date()},
    {id : 3, name : 'Application not responding', isClosed : false, createdAt : new Date()},
]; 
*/

router.get('/', function(req, res, next){
    res.json(bugsList);
});

router.get('/:id', function(req, res, next){
    var id = parseInt(req.params.id);
    //var bug = bugsList.find(function(b){ return b.id === id});
    var bug = bugsList.find(b => b.id === id);
    if (!bug){
        res.sendStatus(404)
    } else {
        res.json(bug);
    }
});

router.post('/', function(req, res, next){
    var bugData = { ...req.body };
    bugData.id = bugsList.reduce((result, bug) => result > bug.id ? result : bug.id, 0) + 1;
    bugsList.push(bugData);
    res.status(201).json(bugData);
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