var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('student/homepage');
});
router.get('/registration', function(req, res, next) {
  res.render('student/student-registration');
});
router.get('/login', function(req, res, next) {
  res.render('student/student-login');
});
router.get('/dashboard', function(req, res, next) {
  res.render('student/student-dashboard');
});

router.get('/application-form', function(req, res, next) {
  res.render('student/student-applicationform');
});



module.exports = router;
