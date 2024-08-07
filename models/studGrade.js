const mongoose = require('mongoose');

const studGradeSchema = new mongoose.Schema({
  studname: String,
  firstcourse: Number,
  secondcourse: Number,
  thirdcourse: Number,
  fourthcourse: Number,
  fivethcourse: Number,
  sixthcourse: Number,
  seventhcourse: Number,
  average:Number,
  grade: String
});

module.exports = mongoose.model('studGrade', studGradeSchema);
