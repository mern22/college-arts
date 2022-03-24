var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/login', function(req, res, next) {
    res.render('superadmin/admin-login');
});
router.get('/dashboard', function(req, res, next) {
  res.render('superadmin/admin-dashboard');
});
router.get('/add-organiser', function(req, res, next) {
  res.render('superadmin/add-organiser');
});
router.get('/program-report', function(req, res, next) {
  res.render('superadmin/program-report');
});


module.exports = router;
