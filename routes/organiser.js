var express = require('express');
const artsclubHelpers = require('../helpers/artsclub-helpers');
const organisersHelpers = require('../helpers/organisers-helpers');
var router = express.Router();

const verifyOrganiserLogin = (req, res, next) => {
  if(req.session.organiserLoggedIn){
    next();
  }else{
    res.redirect("/organiser/login")
  }
}

/* GET home page. */
router.get('/login', function(req, res, next) {

  if(req.session.organiserLoggedIn){
    res.redirect("/organiser/dashboard") ;
  }else{
    res.render("organiser/organiser-login",{showheader:false});
  }

});

router.get('/dashboard',verifyOrganiserLogin,async function(req, res, next) {

  const approvedSolo = await organisersHelpers.getAllSoloApproved() ;
  const approvedGroup = await organisersHelpers.getAllGroupApproved() ;
  const allJudges = await organisersHelpers.getAlljudges() ;
  const allotedStudents = await organisersHelpers.getAllAlottedStudents() ;

  res.render("organiser/organiser-dashboard",{approvedSolo,approvedGroup,allJudges,allotedStudents});
});

router.post("/login", (req, res) => {
  organisersHelpers.doOrganiserLogin(req.body).then((response) => {

    req.session.organiserLoggedIn=true; 
    req.session.organiser=response ;
    console.log("organiser",response);
    res.redirect("/organiser/dashboard");

  }).catch((err) => {

    res.render("organiser/organiser-login",{"errorMsg":err})
    
  })
})

router.post("/addpost",verifyOrganiserLogin, (req, res) => {
  req.body.date = new Date()
  organisersHelpers.createPost(req.body).then((response) => {
    res.redirect("/organiser/dashboard") ;
  }).catch(() => res.redirect("/organiser/dashboard") );
})


router.post("/addnotice",verifyOrganiserLogin, (req, res) => {
  req.body.date = new Date()
  organisersHelpers.createNotice(req.body).then((response) => {
    res.redirect("/organiser/dashboard") ;
  }).catch(() => res.redirect("/organiser/dashboard") );
})


router.get("/allot/:id", verifyOrganiserLogin, (req, res) => {
  const applicationId = req.params.id ;
  artsclubHelpers.getApplication(applicationId).then((details) => {
    res.render("organiser/organiser-allot",{ artsclub:true,details })
  }).catch((err) => res.send(err) ) ;
})

router.post("/allot", verifyOrganiserLogin, (req, res) => {
  organisersHelpers.updateApplication(req.body).then((data) => {
    res.redirect("/organiser/dashboard")
  }).catch((err) => res.send(err))
 
})

router.post("/addjudge", (req, res) => {
  organisersHelpers.addJudges(req.body).then(() => {
    res.redirect("/organiser/dashboard")
  }).catch(() => res.redirect("/organiser/dashboard"))
})

router.post("/removejudge", (req, res) => {
  organisersHelpers.removeJudge(req.body.username).then(() =>{
    res.redirect("/organiser/dashboard") ;
  }).catch(() => res.redirect("/organiser/dashboard")) ;
})
router.get("/logout",(req,res) => {
  req.session.organiserLoggedIn = false ;
  req.session.organiser=null;
  res.redirect("/organiser/login") ;
})



module.exports = router;
