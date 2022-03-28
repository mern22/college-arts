var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/login', function(req, res, next) {
  res.render("organiser/organiser-login",{showheader:false});
});
router.get('/dashboard', function(req, res, next) {
  res.render("organiser/organiser-dashboard");
});


module.exports = router;
