import mongoose from 'mongoose'

mongoose.connect("mongodb+srv://mdayan835:ma687VEWl7IivuWI@cluster0.zwddd3i.mongodb.net/alexStore")
.then(function(){
    console.log("mongodb connected");
})
.catch(function(err){
    console.log(err);
    
})
export default mongoose.connection