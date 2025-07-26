import { useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { baseUrl } from ".././utils/constant";

const PaymentSuccess = () => {
  const location = useLocation();

  // useEffect(() => {
  //   const sendPaymentDetails = async () => {
  //     try {
  //       const {
  //         razorpayOrderId,
  //         razorpayPaymentId,
  //         razorpaySignature,
  //         orderCreationId,
  //         cartItems,
  //         amount,
  //         userId,
  //       } = location.state || {};

  //       if (!razorpayOrderId || !razorpayPaymentId) {
  //         console.error("Missing payment data");
  //         return;
  //       }

  //       const res = await axios.post(`${baseUrl}/payment/success`, {
  //         razorpayOrderId,
  //         razorpayPaymentId,
  //         razorpaySignature,
  //         orderCreationId,
  //         cartItems,
  //         amount,
  //         userId,
  //       });

  //       console.log("✅ Order saved:", res.data);
  //     } catch (err) {
  //       console.error(" Failed to save order:", err);
  //     }
  //   };

  //   sendPaymentDetails();
  // }, [location.state]);

  return (
    <div className="container text-center mt-5">
      <h1>Your order is successfully placed!</h1>
      <p>Thank you for shopping with us.</p>
    </div>
  );
};

export default PaymentSuccess;
