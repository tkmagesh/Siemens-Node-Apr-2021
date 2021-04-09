var express = require('express'),
    router = express.Router(),
    bugDb = require('../services/bugDb');

//using async await
router.get('/', async function(req, res, next){
    try {
        var bugs = await bugDb.readAll()
        res.json(bugs);
    } catch (err){
        return res.sendStatus(500);
    }
});

router.get('/:id', async function(req, res, next){
    try {
        var id = parseInt(req.params.id);
        var bugs = await bugDb.readAll();
        var bug = bugs.find(b => b.id === id);
        if (!bug){
            res.sendStatus(404)
        } else {
            res.json(bug);
        }
    } catch (err) {
         return res.sendStatus(500);
    }
});

router.post('/', async function(req, res, next){
    try {
        var bugs = await bugDb.readAll()
        var bugData = { ...req.body };
        bugData.id = bugs.reduce((result, bug) => result > bug.id ? result : bug.id, 0) + 1;
        bugs.push(bugData);
        await bugDb.save(bugs)
        res.status(201).json(bugData);
    } catch (err) {
        return res.sendStatus(500);
    }
})

router.put('/:id', async function(req, res, next){
    try {
        var id = parseInt(req.params.id);
        var bugs = await bugDb.readAll();
        var existingBug = bugs.find(bug => bug.id === id);
        if (!existingBug){
            return res.sendStatus(404);
        }
        var updatedBug = { ...req.body};
        var updatedBugs = bugs.map(bug => bug.id === id ? updatedBug : bug);
        await bugDb.save(updatedBugs)
        res.status(200).json(updatedBug);
    } catch (err) {
        return res.sendStatus(500);
    }
});

//update the following to use async await
router.patch('/:id', function(req, res, next){
    var id = parseInt(req.params.id);
    
     bugDb.readAll()
        .then(function(bugs){
            var existingBug = bugs.find(bug => bug.id === id);
            if (!existingBug){
                return res.sendStatus(404);
            }
            var updatedBug = { ...existingBug, ...req.body};
            var updatedBugs = bugs.map(bug => bug.id === id ? updatedBug : bug);
            return bugDb
                .save(updatedBugs)
                .then(function(){
                    res.status(200).json(updatedBug);
                })
        })
        .catch(function(err){
            return res.sendStatus(500);
        })
});

router.delete('/:id', function(req, res, next){
    var id = parseInt(req.params.id);
    bugDb.readAll()
        .then(function(bugs){
            var existingBug = bugs.find(bug => bug.id === id);
            if (!existingBug){
                return res.sendStatus(404);
            }
            var updatedBugs = bugs.filter(bug => bug.id !== id);
            return bugDb.save(updatedBugs)
                .then(function(){
                    res.sendStatus(200);
                })
        })
        .catch(function(err){
            console.log(err);
            return res.sendStatus(500);
        });
});

//using promises
/* router.get('/', function(req, res, next){
    var p = bugDb.readAll()
    p.then(function(bugs){
        res.json(bugs);
    })
    .catch(function(err){
        return res.sendStatus(500);
    })
});

router.get('/:id', function(req, res, next){
    var id = parseInt(req.params.id);
    bugDb.readAll()
        .then(function(bugs){
            var bug = bugs.find(b => b.id === id);
            if (!bug){
                res.sendStatus(404)
            } else {
                res.json(bug);
            }
        })
        .catch(function(err){
            return res.sendStatus(500);
        })
});

router.post('/', function(req, res, next){
    bugDb.readAll()
        .then(function(bugs){
            var bugData = { ...req.body };
            bugData.id = bugs.reduce((result, bug) => result > bug.id ? result : bug.id, 0) + 1;
            bugs.push(bugData);
            return bugDb
                .save(bugs)
                .then(function(){
                    res.status(201).json(bugData);
                });
        })
        .catch(function(err){
            return res.sendStatus(500);
        })
})

router.put('/:id', function(req, res, next){
    var id = parseInt(req.params.id);
    bugDb.readAll()
        .then(function(bugs){
            var existingBug = bugs.find(bug => bug.id === id);
            if (!existingBug){
                return res.sendStatus(404);
            }
            var updatedBug = { ...req.body};
            var updatedBugs = bugs.map(bug => bug.id === id ? updatedBug : bug);
            return bugDb
                .save(updatedBugs)
                .then(function(){
                    res.status(200).json(updatedBug);
                })
        })
        .catch(function(err){
            return res.sendStatus(500);
        })
});

router.patch('/:id', function(req, res, next){
    var id = parseInt(req.params.id);
    
     bugDb.readAll()
        .then(function(bugs){
            var existingBug = bugs.find(bug => bug.id === id);
            if (!existingBug){
                return res.sendStatus(404);
            }
            var updatedBug = { ...existingBug, ...req.body};
            var updatedBugs = bugs.map(bug => bug.id === id ? updatedBug : bug);
            return bugDb
                .save(updatedBugs)
                .then(function(){
                    res.status(200).json(updatedBug);
                })
        })
        .catch(function(err){
            return res.sendStatus(500);
        })
});

router.delete('/:id', function(req, res, next){
    var id = parseInt(req.params.id);
    bugDb.readAll()
        .then(function(bugs){
            var existingBug = bugs.find(bug => bug.id === id);
            if (!existingBug){
                return res.sendStatus(404);
            }
            var updatedBugs = bugs.filter(bug => bug.id !== id);
            return bugDb.save(updatedBugs)
                .then(function(){
                    res.sendStatus(200);
                })
        })
        .catch(function(err){
            console.log(err);
            return res.sendStatus(500);
        });
}); */


//using callbacks
/* router.get('/', function(req, res, next){
    bugDb.readAll(function(err, bugs){
        if (err){
            return res.sendStatus(500);
        };
        res.json(bugs);
    })    
});

router.get('/:id', function(req, res, next){
    var id = parseInt(req.params.id);
    bugDb.readAll(function(err, bugs){
        if (err){
            return res.sendStatus(500);
        };
        var bug = bugs.find(b => b.id === id);
        if (!bug){
            res.sendStatus(404)
        } else {
            res.json(bug);
        }
    });
});

router.post('/', function(req, res, next){

    bugDb.readAll(function(err, bugs){
        if (err){
            return res.sendStatus(500);
        };
        var bugData = { ...req.body };
        bugData.id = bugs.reduce((result, bug) => result > bug.id ? result : bug.id, 0) + 1;
        bugs.push(bugData);
        bugDb.save(bugs, function(err){
            if (err){
                return res.sendStatus(500);
            }
            res.status(201).json(bugData);
        });
    });
    
    
})

router.put('/:id', function(req, res, next){
    var id = parseInt(req.params.id);
    bugDb.readAll(function(err, bugs){
        if (err){
            return res.sendStatus(500);
        };
        var existingBug = bugs.find(bug => bug.id === id);
        if (!existingBug){
            return res.sendStatus(404);
        }
        var updatedBug = { ...req.body};
        var updatedBugs = bugs.map(bug => bug.id === id ? updatedBug : bug);
        bugDb.save(updatedBugs, function(err){
            if (err){
                return res.sendStatus(500);
            }
            res.status(200).json(updatedBug);
        });
    });
    
    
});

router.patch('/:id', function(req, res, next){
    var id = parseInt(req.params.id);
    bugDb.readAll(function(err, bugs){
        if (err){
            return res.sendStatus(500);
        };
        var existingBug = bugs.find(bug => bug.id === id);
        if (!existingBug){
            return res.sendStatus(404);
        }
        var updatedBug = { ...existingBug, ...req.body};
        var updatedBugs = bugs.map(bug => bug.id === id ? updatedBug : bug);
        bugDb.save(updatedBugs, function(err){
            if (err){
                return res.sendStatus(500);
            }
            res.status(200).json(updatedBug);
        });
    });
});

router.delete('/:id', function(req, res, next){
    var id = parseInt(req.params.id);
    bugDb.readAll(function(err, bugs){
        if (err){
            return res.sendStatus(500);
        };
        var existingBug = bugs.find(bug => bug.id === id);
        if (!existingBug){
            return res.sendStatus(404);
        }
        var updatedBugs = bugs.filter(bug => bug.id !== id);
        bugDb.save(updatedBugs, function(err){
            if (err){
                return res.sendStatus(500);
            }
            res.sendStatus(200);
        });
    });
}); */

/* route configurations */
module.exports = router;