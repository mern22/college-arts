var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/login', function(req, res, next) {
  res.render("judges/judges-login");
});

router.get('/mark-entering', function(req, res, next) {
  res.render("judges/mark-entering")
});

router.get('/dashboard', function(req, res, next) {
  res.render("judges/judges-dashboard")
});

module.exports = router;
