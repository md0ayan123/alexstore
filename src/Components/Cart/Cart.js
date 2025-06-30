import { useState } from 'react';
import { useCart, useDispatchCart } from '../context/cart._context';
import './cart.css';
import axios from 'axios'
import { baseUrl } from '../../utils/constant';


const Cart = () => {
  // const [showConfirmation, setShowConfirmation] = useState(false); 
  let data = useCart();
  const dispatch = useDispatchCart();

  const [quantities, setQuantities] = useState(
    data.map(() => 1)
  );

  const handleQuantityChange = (index, delta) => {
    setQuantities((prev) =>
      prev.map((q, i) => (i === index ? Math.max(1, q + delta) : q))
    );
  };
  const handleRemove = (id) => {
    dispatch({ type: 'REMOVE', id });
  };
  const handleCheckout = () => {
    dispatch({ type: 'CLEAR' });
    setQuantities([]);

  };
 
    function loadScript(src) {
        return new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = src;
            script.onload = () => {
                resolve(true);
            };
            script.onerror = () => {
                resolve(false);
            };
            document.body.appendChild(script);
        });
    }
     async function displayRazorpay() {
        const res = await loadScript(
            "https://checkout.razorpay.com/v1/checkout.js"
        );

        if (!res) {
            alert("Razorpay SDK failed to load. Are you online?");
            return;
        }

        const totalAmount = data.reduce((acc, item, index) => acc + item.price * quantities[index], 0);
        const result = await axios.post(`${baseUrl}/payment/orders`, { amount: totalAmount });

        if (!result) {
            alert("Server error. Are you online?");
            return;
        }

        const { amount, id: order_id, currency } = result.data;

        const options = {
            key: "rzp_test_VAo20oigvFmBQ6", // Enter the Key ID generated from the Dashboard
            amount: (amount * 100).toString(),
            currency: "USD",
            name: "Alex Store Pvt Ltd",
            description: "Order Payment",
            // image: { logo },
            order_id: order_id,
            handler: async function (response) {
                const data = {
                    orderCreationId: order_id,
                    razorpayPaymentId: response.razorpay_payment_id,
                    razorpayOrderId: response.razorpay_order_id,
                    razorpaySignature: response.razorpay_signature,
                };

                const result = await axios.post(`${baseUrl}/payment/success`, data);
                
                
              if (result.data.msg === "success") {
                 
               handleCheckout();
                 window.location.href = "/payment-success";
              } else {
                  alert("Payment verification failed.");
              }

            },
            prefill: {
                name: "Alex store",
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
    }

 const handlePayment = async () => {
  await displayRazorpay();
};




  return (
    <div className='container'>
      <div className='cart_heading'>
        <p style={{fontSize:"35px"}}>Shopping Cart</p>
        <p className="mt-3" style={{ fontSize: "20px" }}>Price</p>
      </div>
      <hr />
      <div className='cart-items'>
        {data.map((element, index) => (
          <div key={index}>
            <div className='cart-data'>
              <div className='d-flex gap-3'>
                <div className=' cart-content'>
                  <div className='d-flex gap-2'>
                  <p>{index + 1}</p>
                  <img
                    src={element.image}
                    style={{ width: '100px', height: '100px' }}
                    alt=''
                  />
                  </div>
                 
                     <div className='card-category'>
                  <p className='para-decription'> {element.description.slice(1, 120)}...</p>
                  <div className='d-flex gap-4 align-items-start '>
                    <div className='quantity-controls'>
                      <button onClick={() => handleQuantityChange(index, -1)}>-</button>
                      <span className='mx-2'>{quantities[index]}</span>
                      <button onClick={() => handleQuantityChange(index, 1)}>+</button>
                    </div>
                    <button
                      className='btn btn-danger btn-sm mt-2'
                      onClick={() => handleRemove(element.id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
                </div>
             
                <p className='mt-2 price' style={{ fontWeight: "bold", fontSize: "18px" }}>${(element.price * quantities[index]).toFixed(2)}</p>
              </div>


            </div>
            <hr className='hr' />
          </div>
        ))}
      </div>
      <div className="text-end mt-4" style={{ fontSize: "26px", }}>
        Subtotal: $
        {data.reduce((acc, item, index) => acc + item.price * quantities[index], 0).toFixed(2)}
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

