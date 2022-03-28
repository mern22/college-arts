var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/login', function(req, res, next) {
  res.render("artsclub/artsclub-login", { showheader:false })
});

router.get('/dashboard', function(req, res, next) {
  res.render("artsclub/artsclub-dashboard")
});
router.get('/verify-programs', function(req, res, next) {
  res.render("artsclub/verify-programs") ;
});
module.exports = router;
