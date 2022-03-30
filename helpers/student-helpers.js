const { get } = require("../config/connection")
const { ObjectId } = require("mongodb")
const { STUDENT_COLLECTION } = require("../config/collections")

module.exports = {
    doSignup : (studentData) => {

    },
    checkRegnoExist : (regno) => {
        return new Promise( async(resolve, reject) => {
           
            const student = await get()
        })
    },
    getStudentData : (studentId) => {
        return new Promise( async(resolve, reject) => {
            //return the student details with the student id
            const student = await get()
        })
    }
}