const { get } = require("../config/connection");
const { ORGANISER_COLLECTION,POST_COLLECTION,NOTICE_COLLECTION,PROGRAM_COLLECTION,JUDGES_COLLECTION } = require("../config/collections");
const { ObjectId } = require("mongodb");

module.exports = {
    doOrganiserLogin:(loginData) => {        
        return new Promise((resolve, reject) => {
            get().collection(ORGANISER_COLLECTION).findOne({email:loginData.email,password:loginData.password}).then((res) => {
                if(res) {
                   resolve(res)
                } else {
                    reject("Invalid email or password !") ;
                }
            })
        })
    },
    createPost :(post) => {
        return new Promise((resolve, reject) => {
            get().collection(POST_COLLECTION).insertOne(post).then((res) => {
                if(res.acknowledged){
                    resolve()
                } else {
                    reject()
                }
            })
        })
    },
    createNotice: (notice) => {
        return new Promise((resolve, reject) => {
            get().collection(NOTICE_COLLECTION).insertOne(notice).then((res) => {
                if(res.acknowledged){
                    resolve()
                } else {
                    reject()
                }
            })
        })
    },
    getAllSoloApproved: () => {
        return new Promise((resolve, reject) => {
            get().collection(PROGRAM_COLLECTION).find({programtype:"solo",status:"approved"}).toArray().then((res) => {
                if(res){
                  resolve(res)  
                }else{
                    reject("Not found")
                }
            })
        })

    },
    getAllGroupApproved: () => {
        return new Promise((resolve, reject) => {
            get().collection(PROGRAM_COLLECTION).find({programtype:"group",status:"approved"}).toArray().then((res) => {
                if(res){
                  resolve(res)  
                }else{
                    reject("Not found")
                }
            })
        })

    },
    updateApplication : (data) => {
        const {stage,day,chestno,time,id} = data ;
        return new Promise((resolve, reject) => {
            get().collection(PROGRAM_COLLECTION).updateOne({_id:new ObjectId(id)}, { $set:{"stage":stage,"day":day,"chestno":chestno,"time":time,status:"allocated"} },false,true)
            .then((res) => {
                if(res){
                    resolve(res)  
                  }else{
                      reject("Not found")
                  }
            })
        })
    },
    addJudges : (details) => {
        return new Promise((resolve, reject) => {
             get().collection(JUDGES_COLLECTION).insertOne(details).then((res) => {
                if(res.acknowledged){
                    resolve()
                } else {
                    reject()
                }
             })
        })
    },
    removeJudge :(username) => {
        return new Promise((resolve, reject) => {
            get().collection(JUDGES_COLLECTION).deleteOne({username:username}).then((res) => {
               if(res.acknowledged){
                   resolve()
               } else {
                   reject()
               }
            })
       })
    },
    getAlljudges : () => {
        return new Promise((resolve, reject) => {
            get().collection(JUDGES_COLLECTION).find().toArray().then((res) => {
                if(res){
                  resolve(res)  
                }else{
                    reject("Not found")
                }
            })
        })
    },
    getAllAlottedStudents : () => {
        return new Promise((resolve, reject) => {
            get().collection(PROGRAM_COLLECTION).find({status:"allocated"}).toArray().then((res) => {
                if(res){
                  resolve(res)  
                }else{
                    reject("Not found")
                }
            })
        })
    },
 
    
}