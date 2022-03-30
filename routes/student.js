var express = require('express');
var router = express.Router();
const studentHelpers = require("../helpers/student-helpers") ;


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

router.post("/signup" ,(req, res) => {

  const formData = {
      name:"athul",
      rollno:"2",
      class:"ps2",
      regno:"9784651",
      gender:"male",
      email:"athul@gmail.com",
      password:"548122",
      confirmpassword:"548122"
  }
  
  
  studentHelpers.checkRegnoExist(formData.regno).then((data) => {
    if(data){
      res.send(" You are already registered with this register number ") ;
    } else {
      studentHelpers.doSignup(formData).then((response) => {

          // studentHelpers.getStudentData(id).then((data) => {
          //     localStorage.setItem("studentLoggedIn", [{...data}])
          // })
      })
    }
  })
  
})





module.exports = router;
