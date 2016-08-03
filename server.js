'use strict';

/*------------------------------------------------
 BASE SETUP
 ------------------------------------------------*/
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/noobsee');
var Course = require('./app/models/course.js');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/app'));

var port = process.env.PORT || 3000; //set database or port 3000.

/*------------------------------------------------
 ROUTES FOR OUT API
 ------------------------------------------------*/
var router = express.Router(); //get instance of express Router

// middleware to use for all requests.
router.use(function ( req, res, next ){
    // do logging
    console.log('Somthing is happening');
    next(); // make sure we go to the next routes.
});

//test route to make sure everything is working.
router.get('/', function ( req, res ){
    res.json({ message: "Success! You have connected to the api" });
});

router.route('/courses')
      .post(function ( req, res ){
          var course = new Course();
          course.title = req.body.name;
          course.description = req.body.description;
          course.language = req.body.language;
          course.experienceLevel = req.body.experienceLevel;
          course.imageUrl = req.body.imageUrl;
          course.progress = req.body.progress;

          course.save(function ( err ){
              if ( err )
                  res.send(err);
              else {
                  res.json({ message: "Course created!" });
                  console.log(course);
              }
          })
      })
      // get all the courses on /api/courses
      .get(function ( req, res ){
          Course.find(function ( err, courses ){
              if ( err )
                  res.send(err);
              else {
                  res.json(courses);
                  console.log(courses);
              }
          });
      });

router.route('/courses/:course_id')
      .get(function ( req, res ){
          Course.findById(req.params.course_id, function ( err, course ){
              if ( err )
                  res.send(err);
              else {
                  res.json(course);
              }
          })
      })
      .put(function ( req, res ){
          Course.findById(req.params.course_id, function ( err, course ){
              if ( err )
                  res.send(err);
              else {
                  course.title = req.body.title;
                  course.description = req.body.description;
                  course.language = req.body.language;
                  course.experienceLevel = req.body.experienceLevel;
                  course.imageUrl = req.body.imageUrl;
                  course.progress = req.body.progress;

                  //save course
                  course.save(function ( err ){
                      if ( err )
                          res.send(err);
                      else {
                          res.json({ message: "Course updated!" });
                      }
                  })
              }
          })
      })
      .delete(function ( req, res ){
          Course.remove({
              _id: req.params.course_id
          }, function ( err, course ){
              if (err)
                res.send(err);
              else {
                  res.json({ message: "Successfully deleted course."});
              }
          })
      });

//Folder where files are served.
// app.use('/api', express.static('app'));
app.use('/api', router);

/*------------------------------------------------
 START SERVER
 ------------------------------------------------*/

app.get('*', function ( req, res ){
    res.sendFile('./app/index.html');
});

app.listen(port);
console.log('~~ NoobSee listening on http://localhost:3000 ~~');
