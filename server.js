'use strict';

/*------------------------------------------------
 BASE SETUP
 ------------------------------------------------*/
var express = require('express');
var app = express();
var courseRoutes = require('./app/routes/courses');
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

/*------------------------------------------------
 ROUTES FOR OUT API
 ------------------------------------------------*/

//Folder where files are served.
// app.use('/api', express.static('app'));
app.use('/api', courseRoutes);


/*------------------------------------------------
 START SERVER
 ------------------------------------------------*/

app.get('*', function ( req, res ){
    res.sendFile('./app/index.html');
});

app.listen(port);
console.log('~~ NoobSee listening on http://localhost:3000 ~~');
