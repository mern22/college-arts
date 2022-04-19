const { get } = require("../config/connection")
const { ObjectId } = require("mongodb")
const { STUDENT_COLLECTION,PROGRAM_COLLECTION, POST_COLLECTION } = require("../config/collections")

module.exports = {
    doSignup : (studentData) => {
        return new Promise((resolve,reject) => {
            if(studentData.password===studentData.confirmpassword){
                get().collection(STUDENT_COLLECTION).insertOne(studentData).then((data) => {
                    resolve(data)
                })
            } else {
                reject("Password does not match..")
            }
        })
    },
    checkRegnoExist : (regno) => {
        return new Promise( async(resolve, reject) => {
            const student = await get().collection(STUDENT_COLLECTION).findOne({registerno:regno}) ;
            resolve(student)
        })
    },
    getStudentData : (student_id) => {
        return new Promise( async(resolve, reject) => {
            const student = await get().collection(STUDENT_COLLECTION).findOne({_id:student_id}) ;
            resolve(student);
        })
    },
    doLogin : (loginData, studentDbData) => {
        return new Promise((resolve, reject) => {

            let response = {
                student:null,
                status:false
            }

            if(loginData.password===studentDbData.password){
                console.log("student login success");
                response.student=studentDbData;
                response.status=true;
                resolve(response)
            }else{
                console.log("Login failed");
                resolve({status:false})
            }

        })
    },
    applyProgram :(application) => {
        return new Promise((resolve,reject) => {
            get().collection(PROGRAM_COLLECTION).insertOne(application).then((data) => {
                resolve(data);
            })
        })
    },
    getApplications :(regno) => {
        return new Promise((resolve, reject) => {
            get().collection(PROGRAM_COLLECTION).find({ 
                $or:[{
                    regno:regno
                },
                {
                    leaderregno:regno
                },
                {
                    member1:regno
                },
                {
                    member2:regno
                },
                {
                    member3:regno
                },
                {
                    member4:regno
                },
                {
                    member5:regno
                },
                {
                    member6:regno
                },
                {
                    member7:regno
                },
                {
                    member8:regno
                },
                {
                    member9:regno
                },
                {
                    member10:regno
                }
            ]
             }).toArray().then((data) => {
                resolve(data)
            }).catch((err) => {
                reject(err)
            })
        })
    },
    getVerifiedApplications : (regno) => {
        return new Promise((resolve, reject) => {
            get().collection(PROGRAM_COLLECTION).find({status:"allocated", 
                $or:[{
                    regno:regno
                },
                {
                    leaderregno:regno
                },
                {
                    member1:regno
                },
                {
                    member2:regno
                },
                {
                    member3:regno
                },
                {
                    member4:regno
                },
                {
                    member5:regno
                },
                {
                    member6:regno
                },
                {
                    member7:regno
                },
                {
                    member8:regno
                },
                {
                    member9:regno
                },
                {
                    member10:regno
                }
            ]
             }).toArray().then((data) => {
                resolve(data)
            }).catch((err) => {
                reject(err)
            })
        })
    },
    getCompletedApplications : (regno) => {
        return new Promise((resolve, reject) => {
            get().collection(PROGRAM_COLLECTION).find({status:"completed", 
                $or:[{
                    regno:regno
                },
                {
                    leaderregno:regno
                },
                {
                    member1:regno
                },
                {
                    member2:regno
                },
                {
                    member3:regno
                },
                {
                    member4:regno
                },
                {
                    member5:regno
                },
                {
                    member6:regno
                },
                {
                    member7:regno
                },
                {
                    member8:regno
                },
                {
                    member9:regno
                },
                {
                    member10:regno
                }
            ]
             }).toArray().then((data) => {
                resolve(data)
            }).catch((err) => {
                reject(err)
            })
        })
    },
    deleteApplication : (appid) => {
        return new Promise((resolve, reject) => {
            get().collection(PROGRAM_COLLECTION).deleteOne({_id: new ObjectId(appid)}).then((res) => {
                if(res){
                    resolve()
                }else{
                    reject()
                }
            })
        })
    },
    getPostItem :(postId) => {
        return new Promise((resolve, reject) => {
            get().collection(POST_COLLECTION).findOne({_id: new ObjectId(postId)}).then((res) => {
                if(res){
                    resolve(res)
                }else{
                    reject()
                }
            })
        })
    }
}