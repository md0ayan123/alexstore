import registerModel from '../models/register-model.js' 

class user{
    static async register(params){
        return await registerModel.create(params)
    }
    static async signup(params={}){
        return await registerModel.findOne(params)
    }
     static async count(){
        return await registerModel.find().countDocuments()
     }
}
export default user