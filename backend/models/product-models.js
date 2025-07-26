import mongoose from "mongoose"

const productsSchema=mongoose.Schema({
    image:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true},
    price:{
        type:Number,
        required:true
    },
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true
    }
})
export default mongoose.model("product",productsSchema)