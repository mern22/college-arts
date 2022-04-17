var express = require('express');
const artsclubHelpers = require('../helpers/artsclub-helpers');
var router = express.Router();
const judgesHelpers = require("../helpers/judges-helpers") ;
const organisersHelpers = require('../helpers/organisers-helpers');


const verifyJudgesLogin = (req, res, next) => {
  if(req.session.judgesLoggedIn){
    next();
  }else{
    res.redirect("/judges/login")
  }
}



/* GET home page. */
router.get('/login', function(req, res, next) {

  if(req.session.judgesLoggedIn){
    res.redirect("/judges/dashboard") ;
  }else{
    res.render("judges/judges-login", { showheader:false });
  }

 
});

router.get('/dashboard',verifyJudgesLogin,async function(req, res, next) {
  const judge = req.session.judge ;
  const participants = await organisersHelpers.getAllAlottedStudents();
  res.render("judges/judges-dashboard",{judge,participants})
});

router.post("/login", (req, res) => {
  judgesHelpers.doJudgesLogin(req.body).then((response) => {

    req.session.judgesLoggedIn=true; 
    req.session.judge=response ;
    console.log("judge",response);
    res.redirect("/judges/dashboard");

  }).catch((err) => {

    res.render("judges/judges-login",{"errorMsg":err})
    
  })
})

router.get("/mark-enter/:id",verifyJudgesLogin, (req, res) => {
    const appId = req.params.id ;
    artsclubHelpers.getApplication(appId).then((data) =>{
      res.render("judges/mark-entering",{data,artsclub:true})
    })
})

router.post("/mark1", (req, res) => {
  console.log(req.body);
  judgesHelpers.updateMark1(req.body).then(() => {
    res.redirect("/judges/dashboard")
  }).catch(() => res.send("Error occured.."))
})

router.post("/mark2", (req, res) => {
  console.log(req.body);
  judgesHelpers.updateMark2(req.body).then(() => {
    res.redirect("/judges/dashboard")
  }).catch(() => res.send("Error occured.."))
})

router.post("/mark3", (req, res) => {
  console.log(req.body);
  judgesHelpers.updateMark3(req.body).then(() => {
    res.redirect("/judges/dashboard") ;
  }).catch(() => res.send("Error occured.."))
})

router.get("/logout",(req,res) => {
  req.session.judgesLoggedIn = false ;
  req.session.judges=null;
  res.redirect("/judges/login") ;
})


module.exports = router;
