import productModel from '../models/product-models.js'

class product{
    static async create(params){
        return await productModel.create(params)
    }
    static async listed(params={}){
        return await productModel.find(params)
    }
    static async update(id,updatedData){
        return await productModel.findByIdAndUpdate(id,updatedData,{new:true})
    }
      static async delete(params){
            return productModel.findByIdAndDelete(params)
    }
    static async count(){
        return await productModel.find().countDocuments()
    }
}
export default product