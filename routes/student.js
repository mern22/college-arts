var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('student/homepage',{ showheader:true });
});
router.get('/registration', function(req, res, next) {
  res.render('student/student-registration',{ showheader:false });
});
router.get('/login', function(req, res, next) {
  res.render('student/student-login',{ showheader:false });
});
router.get('/dashboard', function(req, res, next) {
  res.render('student/student-dashboard',{ showheader:false });
});

router.get('/application-form', function(req, res, next) {
  res.render('student/student-applicationform');
});



module.exports = router;
