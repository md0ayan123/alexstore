const mongoose=require("mongoose")

const ownerSchema=mongoose.Schema({
   
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})
module.exports=mongoose.model("owner",ownerSchema)