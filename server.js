const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const studGrade = require('./models/studGrade');

const server = express();
const port = 4000;

// mongodb connectiion i here
mongoose.connect('mongodb://localhost:27017/studGradeCalculator', { 
    useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.log(err));

//  ejs  views
server.set('view engine', 'ejs');

// css
server.use(express.static('public'));

// bodyparser
server.use(bodyParser.urlencoded({ extended: true }));

server.get('/viewGrade', async (req, res) => {
    const grades = await studGrade.find();
    res.render('viewGrade', { grades });
  });

server.get('/', async (req, res) => {
  const grades = await studGrade.find();
  res.render('index', { grades });
});


server.post('/calculate', async (req, res) => {
  const { studname, firstcourse,secondcourse, thirdcourse, fourthcourse, fivethcourse, sixthcourse, seventhcourse  } = req.body;
  const scores = [ parseFloat(firstcourse), parseFloat(secondcourse), parseFloat(thirdcourse), 
    parseFloat(fourthcourse), parseFloat(fivethcourse), parseFloat(sixthcourse), parseFloat(seventhcourse),];
  const totalScore = scores.reduce((a, b) => a + b, 0);
  const averageScore = totalScore / scores.length;

  let grade;
  if (averageScore >= 90) {
    grade = 'A';
  } else if (averageScore >= 80) {
    grade = 'B';
  } else if (averageScore >= 70) {
    grade = 'C';
  } else if (averageScore >= 60) {
    grade = 'D';
  } else {
    grade = 'F';
  }

  const newGrade = new studGrade({
    studname: studname, 
    firstcourse: scores[0],
    secondcourse: scores[1],
    thirdcourse: scores[2], 
    fourthcourse: scores[3],
    fivethcourse: scores[4], 
    sixthcourse: scores[5], 
    seventhcourse: scores[6],
    average: averageScore,
    grade: grade
  });

  await newGrade.save();
  res.redirect('/viewGrade');
});

server.listen(port, () => {
  console.log(`server runing at http://localhost:${port}`);
});
