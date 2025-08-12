import productService from '../services/productService.js'


class ProductController{

  
    static async create(req,res){
        try {
            const product=await productService.create(req.body)
               res.status(200).json({
                success:true,
                message:"create product successfully",
                result:product
               })
        } catch (error) {
            res.status(404).json({
                success:false,
                message:error.message
            })
        }
    }
    static async getproducts(req,res){
        try {
            const allProducts=await productService.listed()
            res.status(200).json({
                sucess:true,
                message:"product listed succesfully",
                result:allProducts
            }) 
        } catch (error) {
            res.status(404).json({
              success:false,
              message:error.message
            })  
        }
    }
   static async update(req, res) {
  const { id } = req.params;
  const updatedData = req.body;

  if (!id) {
    return res.status(400).json({
      success: false,
      message: "Product ID is required"
    });
  }

  try {
    const productUpdate = await productService.update(id, updatedData);

    if (!productUpdate) {
      return res.status(404).json({
        success: false,
        message: "Failed to update"
      });
    }

    res.status(200).json({
      success: true,
      message: "Updated successfully",
      result: productUpdate
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
}
    static async delete(req, res) {
  const { id } = req.params;

  try {
    const deleted = await productService.delete(id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

}

export default ProductController