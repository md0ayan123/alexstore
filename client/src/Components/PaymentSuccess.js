// import { useEffect } from "react";
// import axios from "axios";
import { useLocation } from "react-router-dom";
// import { baseUrl } from ".././utils/constant";

const PaymentSuccess = () => {
  const location = useLocation();

  return (
    <div className="container text-center mt-5">
      <h1>Your order is successfully placed!</h1>
      <p>Thank you for shopping with us.</p>
    </div>
  );
};

export default PaymentSuccess;
