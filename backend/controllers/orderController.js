import orderService  from '../services/orderService.js'

class OrderController{
  static async listed(req,res){
     try {
        const orderList=await orderService.listed()
         res.status(200).json({
            success:true,
            message:"order listed successfully",
            result:orderList
         })
         console.log(orderList);
         
     } catch (error) {
        res.status(404).json({
            sucees:false,
            message:error.message,
        })
     }
  }
  static async singleOrder(req,res){
    const{id}=req.params
    try {
        const order=await orderService.single({_id:id})
        res.status(200).json({
            success:true,
            message:"order found successfully",
            result:order

        })
        if(!order){
            res.status(404).json({
                success:false,
                message:"order not found"
            })
        }

    } catch (error) {
        res.status(404).json({
            success:false,
            message:error.message
        })
    }
  }
 static async update(req, res) {
  const { id } = req.params;
  const { status } = req.body;

  if (!status) {
    return res.status(400).json({
      success: false,
      message: "Status is required."
    });
  }

  try {
    const updatedOrder = await orderService.update(id, { status });

    if (!updatedOrder) {
      return res.status(404).json({
        success: false,
        message: "Order not found."
      });
    }

    res.status(200).json({
      success: true,
      message: "Order updated successfully.",
      result: updatedOrder
    });
  } catch (error) {
    console.error("Order update error:", error); // ✅ Add logging for debugging
    res.status(500).json({
      success: false,
      message: "Internal Server Error"
    });
  }
  }


 static async delete(req,res){
    try {
        const deleteOrder=await orderService.delete(req.params.id)
     if(!deleteOrder)
        return(
          res.status(404).json({
            sucess:false,
            message:"order not found"
          })
    )
    res.status(200).json({
        success:true,
        message:"order delete successfully",
        result:deleteOrder
    })

    } catch (error) {
        res.status(404).json({
            sucess:false,
            message:error.message
          })
    }
  }
  
}
export default OrderController