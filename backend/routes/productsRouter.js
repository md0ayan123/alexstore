const express=require("express")
const router=express.Router()
const productModels = require("../models/product-models")
const isLoggin =require("../middleware/auth")
const jwt=require("jsonwebtoken")

router.post('/create',isLoggin, async function(req, res) {
  console.log("api create is running ");
  
  let {image, name, price, title, description } = req.body;
  try {
    let product = await productModels.create({
      image,
      name,
      price,
      title,
      description
    });

    res.status(201).json({
      success: true,
      message: "Successfully created product",
      result: product
    });
       const token = jwt.sign(
                      { user: { id: user._id } },
                      process.env.SECRET_KEY,
                      { expiresIn: '1h' } // optional, token expiry
                  );
                  res.cookie("token", token, { httpOnly: true });
      
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
});

router.get('/listed', async function(req,res){
  let data=await productModels.find()
  res.json({
    success:true,
    message:"getting a product",
    result:data
  })
  //  const token = jwt.sign(
  //                 { user: { id: user._id } },
  //                 process.env.SECRET_KEY,
  //                 { expiresIn: '1h' } // optional, token expiry
  //             );
  //             res.cookie("token", token, { httpOnly: true });
  //             console.log(token);
              
  
  
})
module.exports=router;