var express = require('express');
const artsclubHelpers = require('../helpers/artsclub-helpers');
const organisersHelpers = require('../helpers/organisers-helpers');
const superadminHelpers = require('../helpers/superadmin-helpers');
var router = express.Router();

const verifyAdminLogin = (req, res, next) => {
  if(req.session.adminLoggedIn){
    next();
  }else{
    res.redirect("/superadmin/login")
  }
}

/* GET users listing. */
router.get('/login', function(req, res, next) {

    if(req.session.adminLoggedIn){
      res.redirect("/superadmin/dashboard") ;
    }else{
      res.render('superadmin/admin-login', { showheader:false });
    }
    
});
router.get('/dashboard',verifyAdminLogin,async function(req, res, next) {

  const allStudents = await artsclubHelpers.getAllStudents() ;
  const allSoloPerformance = await artsclubHelpers.getAllsolo() ;
  const allGroupPerformance = await artsclubHelpers.getAllGroup();
  const artsclub = await superadminHelpers.getArtsclub() ;
  const judges = await superadminHelpers.getAllJudges() ;
  const organiser = await superadminHelpers.getOrganiser() ;
  const notices = await artsclubHelpers.getAllNotice() ;
  const posts = await artsclubHelpers.getAllPost();

  res.render('superadmin/admin-dashboard',{notices,posts,allStudents,allSoloPerformance,allGroupPerformance,artsclub,judges,organiser});
});

router.get('/program-report', function(req, res, next) {
  res.render('superadmin/program-report');
});

router.post("/login", (req, res) => {
  superadminHelpers.doAdminLogin(req.body).then((response) => {

    req.session.adminLoggedIn=true; 
    req.session.admin=response ;
    console.log("admin",response);
    res.redirect("/superadmin/dashboard");

  }).catch((err) => {
    
    res.render("superadmin/admin-login",{"errorMsg":err})
    
  })
})

router.post("/addpost",(req,res) =>{
  req.body.date = new Date()
  organisersHelpers.createPost(req.body).then((response) => {
    res.redirect("/superadmin/dashboard") ;
  }).catch(() => res.redirect("/superadmin/dashboard") );
})

router.post("/addnotice", (req, res) => {
  req.body.date = new Date()
  organisersHelpers.createNotice(req.body).then((response) => {
    res.redirect("/superadmin/dashboard") ;
  }).catch(() => res.redirect("/superadmin/dashboard") );
})

router.post("/addartsclub",verifyAdminLogin,(req,res) => {
  superadminHelpers.addArtsclub(req.body).then(() => {
    res.redirect("/superadmin/dashboard") ;
  }).catch(() => res.redirect("/superadmin/dashboard") )
})

router.post("/deleteartsclub",verifyAdminLogin,(req,res) => {
  superadminHelpers.removeArtsclub(req.body).then(() => {
    res.redirect("/superadmin/dashboard") ;
  }).catch(() => res.redirect("/superadmin/dashboard") )
})

router.get("/delete-post/:id",(req, res) => {
  artsclubHelpers.deletePost(req.params.id).then(() => {
    res.redirect("/superadmin/dashboard") ;
  }).catch(()=>res.redirect("/superadmin/dashboard") )
})

router.get("/delete-notice/:id",(req, res) => {
  artsclubHelpers.deleteNotice(req.params.id).then(() => {
    res.redirect("/superadmin/dashboard") ;
  }).catch(()=>res.redirect("/superadmin/dashboard") )
})

router.get("/logout",(req,res) => {
  req.session.adminLoggedIn = false ;
  req.session.admin=null;
  res.redirect("/superadmin/login") ;
})







module.exports = router;
