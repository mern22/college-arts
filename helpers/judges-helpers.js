const { get } = require("../config/connection");
const { ORGANISER_COLLECTION,POST_COLLECTION,NOTICE_COLLECTION,PROGRAM_COLLECTION,JUDGES_COLLECTION } = require("../config/collections");
const { ObjectId } = require("mongodb");


module.exports = {
    doJudgesLogin: (Logindata) => {
        return new Promise((resolve, reject) => {
            get().collection(JUDGES_COLLECTION).findOne({username:Logindata.username,password:Logindata.password}).then((res) => {
                if(res) {
                   resolve(res)
                } else {
                    reject("Invalid email or password !")
                }
            })
        })
    },
    updateMark1: (data) => {
        const { mark1,id } = data
        return new Promise((resolve, reject) => {
            get().collection(PROGRAM_COLLECTION).updateOne({ _id:new ObjectId(id) },{$set:{mark1:mark1,status:"completed"}}).then((res) => {
                console.log(res);
                if(res) {
                    resolve(res)
                 } else {
                     reject()
                 }
            })
        })
    },
    updateMark2: (data) => {
        const { mark2,id } = data
        return new Promise((resolve, reject) => {
            get().collection(PROGRAM_COLLECTION).updateOne({ _id:new ObjectId(id) },{$set:{mark2:mark2,status:"completed"}}).then((res) => {
                console.log(res);
                if(res) {
                    resolve(res)
                 } else {
                     reject()
                 }
            })
        })
    },
    updateMark3: (data) => {
        const { mark3,id } = data ;
        return new Promise((resolve, reject) => {
            get().collection(PROGRAM_COLLECTION).updateOne({ _id:new ObjectId(id) },{$set:{mark3:mark3,status:"completed"}}).then((res) => {
                console.log(res);
                if(res) {
                    resolve(res)
                 } else {
                     reject()
                 }
            })
        })
    }

}