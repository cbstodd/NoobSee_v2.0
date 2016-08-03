var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CourseSchema = new Schema({
    title: String,
    description: String,
    language: String,
    experienceLevel: Number,
    imageUrl: String,
    progress: Number
});

module.exports = mongoose.model('Course', CourseSchema);