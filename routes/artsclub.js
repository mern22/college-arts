var express = require('express');
const artsclubHelpers = require('../helpers/artsclub-helpers');
const studentHelpers = require("../helpers/student-helpers") ;
var router = express.Router();


const verifyArtsLogin = (req, res, next) => {
  if(req.session.artsclubLoggedIn){
    next();
  }else{
    res.redirect("/artsclub/login")
  }

}

/* GET home page. */
router.get('/login', function(req, res, next) {
  
  if(req.session.artsclubLoggedIn){
    res.redirect("/artsclub/dashboard") ;
  }else{
    res.render("artsclub/artsclub-login", { showheader:false })
  }
  
});


router.get('/dashboard',verifyArtsLogin, async function(req, res, next) {
  const artsclub = req.session.artsclub ;

  const allStudents = await artsclubHelpers.getAllStudents() ;
  const allSoloPerformance = await artsclubHelpers.getAllSoloPerformance() ;
  const allGroupPerformance = await artsclubHelpers.getAllGroupPerformance() ;
  const allPosts = await artsclubHelpers.getAllPost() ;
  const allNotice = await artsclubHelpers.getAllNotice() ;
  const results = await artsclubHelpers.getAllCompletedApplications() ;
  const organisers = await artsclubHelpers.getAllOrganiser() ;
  
  res.render("artsclub/artsclub-dashboard",{artsclub, allStudents,allSoloPerformance,allGroupPerformance,allPosts,allNotice,results,organisers})
});

router.post("/login", (req, res) => {
  artsclubHelpers.doArtsLogin(req.body).then((response) => {

    req.session.artsclubLoggedIn=true;
    req.session.artsclub=response ;
    console.log("res",response);
    res.redirect("/artsclub/dashboard");

  }).catch((err) => {

    res.render("artsclub/artsclub-login",{"errorMsg":err})
    
  })
})

router.get("/verify-programs/:id",verifyArtsLogin,(req, res) => {
  const applicationId = req.params.id ;
  artsclubHelpers.getApplication(applicationId).then((details) => {
    let solo ;
    if(details.programtype==="solo"){
      solo=true;
    }else{
      solo=false
    }
    
    res.render("artsclub/verify-programs",{details,artsclub:true,solo})
  })
})

router.post("/verify-message",verifyArtsLogin, (req, res) => {
  artsclubHelpers.setMessageToApplicant(req.body).then((response) => {
    res.redirect(req.get('referer'));
  }).catch((err) => res.send(err))
  
})

router.get("/approve/:id",verifyArtsLogin,(req, res) =>{
  const appId = req.params.id 
  artsclubHelpers.setApprove(appId).then((response) => {
    res.redirect("/artsclub/dashboard")
  }).catch((err) => res.send(err))
})

router.get("/reject/:id",verifyArtsLogin,(req, res) =>{
  const appId = req.params.id 
  artsclubHelpers.setReject(appId).then((response) => {
    res.redirect("/artsclub/dashboard")
  }).catch((err) => res.send(err))
})

router.post("/new-post",verifyArtsLogin, (req, res) => {
  req.body.date = new Date();
  artsclubHelpers.createPost(req.body).then((response) => {
    res.redirect("/artsclub/dashboard") ;
  }).catch(() => res.redirect("/artsclub/dashboard") );
})
router.post("/new-notice",verifyArtsLogin, (req, res) => {
  req.body.date = new Date()
  artsclubHelpers.createNotice(req.body).then((response) => {
    res.redirect("/artsclub/dashboard") ;
  }).catch(() => res.redirect("/artsclub/dashboard") );
})

router.get("/delete-post/:id",verifyArtsLogin, (req,res) => {
  artsclubHelpers.deletePost(req.params.id).then((response) => {
    res.redirect("/artsclub/dashboard");
  }).catch(() => console.log("rejected"))
})

router.get("/delete-notice/:id",verifyArtsLogin, (req,res) => {
  artsclubHelpers.deleteNotice(req.params.id).then((response) => {
    res.redirect("/artsclub/dashboard");
  }).catch(() => console.log("rejected"))
})

router.post("/add-organiser",(req,res) => {
  artsclubHelpers.addOrganiser(req.body).then(() => {
    res.redirect("/artsclub/dashboard") ;
  }).catch(() => res.redirect("/artsclub/dashboard"))
})

router.post("/delete-organiser",(req, res) => {
  artsclubHelpers.deleteOrganiser(req.body.email).then(() => {
    res.redirect("/artsclub/dashboard") ;
  }).catch(() => {
    res.redirect("/artsclub/dashboard") ;
  })
})

router.get("/logout",(req,res) => {
  req.session.artsclubLoggedIn = false ;
  req.session.artsclub=null;
  res.redirect("/artsclub/login") ;
})

module.exports = router;
