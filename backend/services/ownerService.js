import ownerModel from '../models/owner-model.js'

class owner{
    static async admin(params){
     return await ownerModel.findOne(params)
    } 
}
export default owner