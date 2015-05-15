var express = require('express');
var router = express.Router();
var assignments = require('../models/assignment');

/* GET /assignments listing. */
router.get('/', function(req, res, next) {
  assignments.find(function (err, assignments) {
    if (err) return next(err);
    res.json(assignments);
  });
});

/* POST /assignments */
router.post('/', function(req, res, next) {
  assignments.create(req.body, function (err, assignment) {
    if (err) return next(err);
    res.json(assignment);
  });
});

///* GET /assignments/id */
//router.get('/:id', function(req, res, next) {
//  assignments.findById(req.params.id, function (err, assignment) {
//    if (err) return next(err);
//    res.json(assignment);
//  });
//});

/* PUT /assignments/:id */
//router.put('/:id', function(req, res, next) {
//  assignments.findByIdAndUpdate(req.params.id, req.body, function (err, assignment) {
//    if (err) return next(err);
//    res.json(assignment);
//  });
//});

/* DELETE /assignments/:id */
router.delete('/:id', function(req, res, next) {
  assignments.findByIdAndRemove(req.params.id, req.body, function (err, assignment) {
    if (err) return next(err);
    res.json(assignment);
  });
});

/* SORT */
router.get('/search', function(req, res, next) {
    if (req.query.name){
            name = req.query.name;
        }else{
            name= "";
        }

        if (req.query.date){
            name = req.query.date;
        }else{
            date = 1900-01-01;
        }
  assignments.find({name: new RegExp(name, 'i'), date_completed: {$gte : date}}, null,
      {
        sort:{
          name: req.query.sort //Sort by number DESC, can also use date, or any other field
        }
      }
      ,function (err, names) {
        if (err) return next(err);
        res.json(names);
      });
});

console.log('assignments route loaded');
module.exports = router;


