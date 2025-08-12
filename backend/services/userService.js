import userModel from '../models/user-model.js' 

class user{
    static async register(params){
        return await userModel.create(params)
    }
    static async signin(params={}){
        return await userModel.findOne(params)
    }
     static async count(){
        return await userModel.find().countDocuments()
     }
     static async listed(){
        return await userModel.find()
     }
     static async single(id){
        return await userModel.findById(id)
     }
}
export default user