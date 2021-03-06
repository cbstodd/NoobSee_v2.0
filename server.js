'use strict';

/*------------------------------------------------
 BASE SETUP
 ------------------------------------------------*/
var express = require('express');
var app = express();
var courseController = require('./api/controllers/courses');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

//TODO: NEED TO CHANGE TO PRODUCTION DB
mongoose.connect('mongodb://localhost:27017/noobsee');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/app'));

var port = process.env.PORT || 3000; //set database or port 3000.

var router = express.Router();

/*------------------------------------------------
 ROUTES FOR API
 ------------------------------------------------*/
// Create endpoint handlers for /courses
router.route('/courses')
      .post(courseController.postCourses)
      .get(courseController.getCourses);

// Create endpoint handlers for /courses/:course_id
router.route('/courses/:course_id')
      .get(courseController.getCourse)
      .put(courseController.putCourse)
      .delete(courseController.deleteCourse);

// Register all our routes with /api
app.use('/api', router);

/*------------------------------------------------
  SERVER
 ------------------------------------------------*/
app.get('*', function ( req, res ){
    res.sendFile('./app/index.html');
});

app.listen(port);
console.log('~~ Express listening on http://localhost:3000 ~~');
