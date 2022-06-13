const { get } = require("../config/connection")
const { ObjectId } = require("mongodb")
const { ADMIN_COLLECTION, JUDGES_COLLECTION, ARTSCLUB_COLLECTION, ORGANISER_COLLECTION } = require("../config/collections")


module.exports = {
    doAdminLogin: (loginData) =>{
        return new Promise((resolve, reject) => {
            get().collection(ADMIN_COLLECTION).findOne({email:loginData.email,password:loginData.password}).then((res) => {
                if(res) {
                   resolve(res)
                } else {
                    reject("Invalid email or password !")
                }
            })
        })
    },
    addArtsclub :(data) => {
        return new Promise((resolve, reject) => {
            get().collection(ARTSCLUB_COLLECTION).insertOne(data).then((res) => {
                if(res) {
                    resolve()
                 } else {
                     reject()
                 }
            })
        })
    },
    removeArtsclub :(data) => {
        return new Promise((resolve, reject) => {
            const {email} = data
            get().collection(ARTSCLUB_COLLECTION).deleteOne({email:email}).then((res) => {
                if(res) {
                    console.log("res",res);
                    resolve()
                 } else {
                     reject()
                 }
            })
        })
    },
    getArtsclub : () => {
        return new Promise((resolve, reject) => {
            get().collection(ARTSCLUB_COLLECTION).find().toArray().then((res) => {
                if(res) {
                    resolve(res)
                 } else {
                     reject()
                 }
            })
        })
    },
    getAllJudges : () => {
        return new Promise((resolve, reject) => {
            get().collection(JUDGES_COLLECTION).find().toArray().then((res) => {
                if(res) {
                    resolve(res)
                 } else {
                     reject("Not found")
                 }
            })
        })
    },
    getOrganiser : () => {
        return new Promise((resolve, reject) => {
            get().collection(ORGANISER_COLLECTION).find().toArray().then((res) => {
                if(res) {
                    resolve(res)
                 } else {
                     reject("Not found")
                 }
            })
        })
    }
}