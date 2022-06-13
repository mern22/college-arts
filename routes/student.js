var express = require('express');
const artsclubHelpers = require('../helpers/artsclub-helpers');
var router = express.Router();
const studentHelpers = require("../helpers/student-helpers");

const verifyLogin = (req, res, next) =>{
  if(req.session.studentLoggedIn){
    next() ;
  } else {
    res.redirect("/login")
  }
}


/* GET home page. */
router.get('/',async function (req, res, next) {
  const notices = await artsclubHelpers.getAllNotice() ;
  const posts = await artsclubHelpers.getAllPost() ;
  res.render('student/homepage', { showheader: true,notices,posts });
});
router.get("/view-post/:id",(req, res) => {
  studentHelpers.getPostItem(req.params.id).then((data) => {
    if(data){
      res.render("student/view-post",{artsclub:true,data})
    }else{
      res.redirect("/");
    }
  })
  
})
router.get('/registration', function (req, res, next) {
  res.render('student/student-registration', { showheader: false });
});
router.get('/login', function (req, res, next) {

  if(req.session.studentLoggedIn){
    res.redirect("/dashboard") ;
  }else{
    res.render('student/student-login', { showheader: false });
  }
  
});

router.get("/certificate/:id",(req, res) => {
  const appId = req.params.id ;
  const student = req.session.student ;
  artsclubHelpers.getApplication(appId).then((application) => {
    res.render('student/certificate', { artsclub: true,application,student });
  }).catch((err) => res.send(err))
})

router.get('/dashboard',verifyLogin, async function (req, res, next) {

  const student = req.session.student ;
  
  if(student){
    const verifiedApplications = await studentHelpers.getVerifiedApplications(student.registerno) ;
    const completedApplications = await studentHelpers.getCompletedApplications(student.registerno) ;
    const applications = await studentHelpers.getApplications(student.registerno) ;

    res.render('student/student-dashboard', { showheader: false ,student:student,applications,verifiedApplications,completedApplications });
  }

});


router.post("/signup", (req, res) => {

  studentHelpers.checkRegnoExist(req.body.registerno).then((data) => {
    if (data) {
      res.render("student/student-login", {"loginErr":"Already have an account !"})
    } else {
      studParticipatingParticipatingParticipatingentHelpers.doSignup(req.body).then((response) => {
        studentHelpers.getStudentData(response.insertedId).then((student) => {
          res.redirect("/dashboard");
        })
      }).catch((err) => res.send(err))
    }

  }).catch((err) => res.send(err))

})

router.post("/login", (req, res) => {
  studentHelpers.checkRegnoExist(req.body.regno).then((data) => {
    if (data) {
      studentHelpers.doLogin(req.body, data).then((response) => {
        if (response.status) {

          req.session.studentLoggedIn=true;
          req.session.student=response.student ;

          res.redirect("/dashboard")
        } else {
          res.render("student/student-login", {"loginErr":"Invalid Password !"})
        }
      })
    } else {
      res.render("student/student-login", {"loginErr":"No account with this register number  !"})
    }
  })

})

router.post("/application" , (req, res) => {
  studentHelpers.applyProgram(req.body).then((response) => {
    if(response.acknowledged){
      res.redirect("/dashboard")
    }else{
      res.redirect("/dashboard")
    }
  })
})

router.post("/group-application", (req, res) => {
  studentHelpers.applyProgram(req.body).then((response) => {
    if(response.acknowledged){
      res.redirect("/dashboard")
    }else{
      res.redirect("/dashboard")
    }
  })
})

router.get("/delete-application/:id",(req,res) => {
  const appId = req.params.id ;
  studentHelpers.deleteApplication(appId).then(() => {
    res.redirect("/dashboard")
  }).catch(() => res.redirect("/dashboard"))
})

router.get("/logout", (req, res) => {

  req.session.studentLoggedIn = false ;
  req.session.student=null;
  res.redirect("/login") ;

})




module.exports = router;
