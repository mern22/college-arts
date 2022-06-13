const { get } = require("../config/connection");
const { ARTSCLUB_COLLECTION,STUDENT_COLLECTION,PROGRAM_COLLECTION, POST_COLLECTION, NOTICE_COLLECTION, ORGANISER_COLLECTION } = require("../config/collections");
const { ObjectId } = require("mongodb");


module.exports = {
    doArtsLogin: (Logindata) => {
        return new Promise((resolve, reject) => {
            get().collection(ARTSCLUB_COLLECTION).findOne({email:Logindata.email,password:Logindata.password}).then((res) => {
                if(res) {
                   resolve(res)
                } else {
                    reject("Invalid email or password !")
                }
            })
        })
    },
    getAllStudents: () => {
        return new Promise((resolve, reject) => {
            get().collection(STUDENT_COLLECTION).find().toArray().then((res) => {
                if(res){
                    resolve(res)
                } else {
                    reject("Not fount")
                }
            })
        })
    },
    getAllsolo: () => {
        return new Promise((resolve, reject) => {
            get().collection(PROGRAM_COLLECTION).find({programtype:"solo"}).toArray().then((res) => {
                if(res){
                  resolve(res)  
                }else{
                    reject("Not found")
                }
            })
        })
    },
    getAllGroup: () => {
        return new Promise((resolve, reject) => {
            get().collection(PROGRAM_COLLECTION).find({programtype:"group"}).toArray().then((res) => {
                if(res){
                  resolve(res)  
                }else{
                    reject("Not found")
                }
            })
        })
    },
    getAllSoloPerformance: () => {
        return new Promise((resolve, reject) => {
            get().collection(PROGRAM_COLLECTION).find({programtype:"solo",status:"pending"}).toArray().then((res) => {
                if(res){
                  resolve(res)  
                }else{
                    reject("Not found")
                }
            })
        })
    },
    getAllGroupPerformance: () => {
        return new Promise((resolve, reject) => {
            get().collection(PROGRAM_COLLECTION).find({programtype:"group",status:"pending"}).toArray().then((res) => {
                if(res){
                    resolve(res)  
                  }else{
                      reject("Not found")
                  }
            })
        })
    },
    getApplication: (appId) => {
        return new Promise((resolve, reject) => {
            get().collection(PROGRAM_COLLECTION).findOne({_id: ObjectId(appId)}).then((data) => {
                if(data){
                    resolve(data) ;
                }else{
                    reject("Not found") ;
                }
            })
        })
    },
    setMessageToApplicant: (data) =>{
        const { message,appid } = data ;
        return new Promise((resolve, reject) => {
            get().collection(PROGRAM_COLLECTION).updateOne({_id:new ObjectId(appid)},{$set:{message:message}}).then((res) =>{
                if(res.acknowledged){
                    resolve(res)
                }else{
                    reject("error")
                }
            })
        })
    },
    setApprove: (appid) => {
        return new Promise((resolve, reject) => {
            get().collection(PROGRAM_COLLECTION).updateOne({_id:ObjectId(appid)},{$set:{status:"approved"}}).then((res) =>{
                if(res.acknowledged){
                    resolve(res)
                }else{
                    reject("error")
                }
            })
        })
    },
    setReject: (appid) => {
        return new Promise((resolve, reject) => {
            get().collection(PROGRAM_COLLECTION).updateOne({_id:ObjectId(appid)},{$set:{status:"rejected"}}).then((res) =>{
                if(res.acknowledged){
                    resolve(res)
                }else{
                    reject("error")
                }
            })
        })
    },
    createPost: (post) => {
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
    getAllPost: () =>{
        return new Promise((resolve, reject) => {
            get().collection(POST_COLLECTION).find().toArray().then((data) => {
                
                if(data){
                    resolve(data)
                }else{
                    reject()
                }
            })
        })
    },
    deletePost: (postid) => {
        return new Promise((resolve, reject) => {
            get().collection(POST_COLLECTION).deleteOne({_id:ObjectId(postid)}).then((data) => {
                if(data.acknowledged){
                    resolve()
                }else{
                    reject()
                }
            })
        })
    },
    getAllNotice : () => {
        return new Promise((resolve, reject) => {
            get().collection(NOTICE_COLLECTION).find().toArray().then((data) => {
                
                if(data){
                    resolve(data)
                }else{
                    reject()
                }
            })
        })
    },
    deleteNotice: (noticeId) => {
        return new Promise((resolve, reject) => {
            get().collection(NOTICE_COLLECTION).deleteOne({_id:ObjectId(noticeId)}).then((data) => {
                if(data.acknowledged){
                    resolve()
                }else{
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
    getAllCompletedApplications: () => {
        return new Promise((resolve, reject) => {
            get().collection(PROGRAM_COLLECTION).find({status:"completed"}).toArray().then((data) => {
                
                if(data){
                    resolve(data)
                }else{
                    reject()
                }
            })
        })
    },
    getAllOrganiser : () => {
        return new Promise((resolve, reject) => {
            get().collection(ORGANISER_COLLECTION).find().toArray().then((res) => {
                if(res){
                  resolve(res)  
                }else{
                    reject("Not found")
                }
            })
        })
    },
    addOrganiser : (organiser) => {
        return new Promise((resolve, reject) => {
            get().collection(ORGANISER_COLLECTION).insertOne(organiser).then((res) => {
                if(res){
                  resolve(res)  
                }else{
                    reject("Not found")
                }
            })
        })
    },
    deleteOrganiser: (email) => {
        return new Promise((resolve, reject) => {
            get().collection(ORGANISER_COLLECTION).deleteOne({email:email}).then((res) => {
                if(res){
                  resolve(res)  
                }else{
                    reject("Not found")
                }
            })
        })
    }
}