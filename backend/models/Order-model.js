import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  
  user: String,
  razorpayOrderId: String,
  razorpayPaymentId: String,
  razorpaySignature: String,
  amount: Number,
  cartItems: [
    {
      _id: String,
      title: String,
      price: Number,
      quantity: Number,
      image: String
    }
  ],
  status: { type: String, default: "paid" },
  createdAt: Date
});

export default mongoose.model("Order", orderSchema);
