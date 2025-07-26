import mongoose from "mongoose"

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
export default mongoose.model("owner",ownerSchema)