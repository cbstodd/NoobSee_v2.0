var express = require('express');

var router = express.Router(); //get instance of express Router
var Course = require('../models/course');

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

module.exports = router;
