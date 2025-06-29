const mongoose=require('mongoose')

mongoose.connect("mongodb+srv://mdayan835:ma687VEWl7IivuWI@cluster0.zwddd3i.mongodb.net/alexStore")
.then(function(){
    console.log("mongodb connected");
})
.catch(function(err){
    console.log(err);
    
})
module.exports=mongoose.connection