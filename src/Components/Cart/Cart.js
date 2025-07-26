import { useState } from 'react';
import { useCart, useDispatchCart } from '../context/cart._context';
import './cart.css';
import axios from 'axios';
import  {baseUrl}  from '../../utils/constant';
import {  useNavigate } from 'react-router-dom';
 import { toast } from 'react-toastify';

const Cart = () => {
  const cartItems = useCart();
  const dispatch = useDispatchCart();
 
  const navigate=useNavigate()


  const [quantities, setQuantities] = useState(cartItems.map(() => 1));

  const handleQuantityChange = (index, delta) => {
    setQuantities(prev =>
      prev.map((q, i) => (i === index ? Math.max(1, q + delta) : q))
    );
  };

  const handleRemove = (_id) => {
    dispatch({ type: 'REMOVE', _id });
  };

  const handleCheckout = () => {

    dispatch({ type: 'CLEAR' });
    setQuantities([]);
  };

  const loadScript = (src) => {
    return new Promise(resolve => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const displayRazorpay = async () => {
    const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");
    if (!res) {
      toast("Razorpay SDK failed to load.");
      return;
    }

    const totalAmount = cartItems.reduce(
      (acc, item, index) => acc + item.price * quantities[index],
      0
    );

    const orderResponse = await axios.post(`${baseUrl}/payment/orders`, {
      amount: totalAmount
    });

    if (!orderResponse || !orderResponse.data) {
      toast("Failed to create order.");
      return;
    }

    const { amount, id: order_id, currency } = orderResponse.data;

    const options = {
      key: "rzp_test_VAo20oigvFmBQ6",
      amount: (amount * 100).toString(),
      currency: currency,
      name: "Alex Store Pvt Ltd",
      description: "Order Payment",
      order_id: order_id,
      handler: async function (response) {
        const paymentData = {
          orderCreationId: order_id,
          razorpayPaymentId: response.razorpay_payment_id,
          razorpayOrderId: response.razorpay_order_id,
          razorpaySignature: response.razorpay_signature,
          cartItems: cartItems.map((item, index) => ({
            _id: item._id,
            name: item.name,
            price: item.price,
            quantity: quantities[index]
          })),
          amount: totalAmount
        };

        const verifyResponse = await axios.post(`${baseUrl}/payment/success`, paymentData);

        if (verifyResponse.data.msg === "success") {
          handleCheckout();
          window.location.href = "/payment-success";
        } else {
          toast("Payment verification failed.");
        }
      },
      prefill: {
        name: "Alex Store",
        email: "alexstore@example.com",
        contact: "9608122272",
      },
      notes: {
        address: "Alex Store Corporate Office",
      },
      theme: {
        color: "#61dafb",
      },
    };  

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  const handlePayment = async () => {
  const token =localStorage.getItem("token") 

  if (!token) {
    toast("Please login to proceed with checkout.");
    setTimeout(()=>{
        navigate('/login');
    },2000)
    return;
  }

  await displayRazorpay();
};



  const subtotal = cartItems.reduce(
    (acc, item, index) => acc + item.price * quantities[index],
    0
  );

  return (
    <div className='container' >
      <div className='cart_heading'>
        <p style={{ fontSize: "35px" }}>Shopping Cart</p>
        <p className="mt-3" style={{ fontSize: "20px" }}>Price</p>
      </div>
      <hr />

      <div className='cart-items'>
        {cartItems?.map((item, index) => (
          <div key={item._id}>
            <div className='cart-data'>
              <div className='d-flex gap-3'>
                <div className='cart-content d-flex gap-2'>
                  <p>{index + 1}</p>
                  <img
                    src={item.image}
                    style={{ width: '100px', height: '100px' }}
                    alt=''
                  />
                  <div className='card-category'>
                    <p className='para-decription'>{item.description}...</p>
                    <div className='d-flex gap-4 align-items-start'>
                      <div className='quantity-controls'>
                        <button onClick={() => handleQuantityChange(index, -1)}>-</button>
                        <span className='mx-2'>{quantities[index]}</span>
                        <button onClick={() => handleQuantityChange(index, 1)}>+</button>
                      </div>
                      <button
                        className='btn btn-danger btn-sm mt-2'
                        onClick={() => handleRemove(item._id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
                <p className='mt-2 price' style={{ fontWeight: "bold", fontSize: "18px" }}>
                  ${(item.price * quantities[index]).toFixed(2)}
                </p>
              </div>
            </div>
            <hr className='hr' />
          </div>
        ))}
      </div>

      <div className="text-end mt-4" style={{ fontSize: "26px" }}>
        Subtotal: ${subtotal.toFixed(2)}
      </div>
      <div className="text-end mt-2">
        <button className="btn btn-success mb-5" onClick={handlePayment}>
          Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;
