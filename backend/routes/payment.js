import dotenv from 'dotenv';
dotenv.config();
import express from "express" 
import Razorpay from "razorpay"
import crypto from "crypto"
import OrderModel from "../models/Order-model.js"
const router = express.Router();  

// Initialize Razorpay
const instance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET,
});                             

// Create Razorpay Order
router.post("/orders", async (req, res) => {
  try {
    const { amount } = req.body;

    const options = {
      amount: Math.round(amount * 100), // in smallest currency unit
      currency: "USD", // or "USD" if supported
      receipt: "receipt_order_" + Date.now(),
    };

    const order = await instance.orders.create(options);
    if (!order) return res.status(500).send("Failed to create order");

    res.json(order);
  } catch (error) {
    console.error("Order creation failed:", error);
    res.status(500).send(error.message || "Server error");
  }
});

// Handle Payment Success
router.post("/success", async (req, res) => {
  try {
    const {
      orderCreationId,
      razorpayPaymentId,
      razorpayOrderId,
      razorpaySignature,
      userId,
      amount,
      cartItems,
    } = req.body;
console.log(req.body,);

    // Signature verification
    const shasum = crypto.createHmac("sha256", process.env.RAZORPAY_SECRET);
    shasum.update(`${orderCreationId}|${razorpayPaymentId}`);
    const digest = shasum.digest("hex");

    if (digest !== razorpaySignature) {
      return res.status(400).json({ msg: "Transaction not legit!" });
    }

    // Save to DB
    const order = new OrderModel({
      user: userId,
      amount,
      cartItems,
      razorpayOrderId,
      razorpayPaymentId,
      razorpaySignature,
      status: "paid",
      createdAt: new Date(),
    });

    await order.save();

    res.json({
      msg: "success",
      orderId: order._id,
      paymentId: razorpayPaymentId,
    });
  } catch (error) {
    console.error("Payment success error:", error);
    res.status(500).json({ msg: "failed", error: error.message });
  }
});



export default router;
