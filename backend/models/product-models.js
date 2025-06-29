const mongoose=require("mongoose")

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
module.exports=mongoose.model("product",productsSchema)