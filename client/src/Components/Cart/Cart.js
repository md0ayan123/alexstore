import { useState } from 'react';
import { useCart, useDispatchCart } from '../context/cart._context';
import './cart.css';
import axios from 'axios';
import  {baseUrl}  from '../../utils/constant';
import { useNavigate } from 'react-router-dom';
 import { toast } from 'react-toastify';
import { TfiArrowLeft } from "react-icons/tfi";
import { RxCross2 } from "react-icons/rx";
// import asIcon from '../../assets/asIcons.jpg'
import emptycart from '../../././assets/emptycart.png'

 import { Link } from 'react-router-dom';

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
          toast.success("Order placed successfully")
          // window.location.href = "/payment-success";
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
     navigate('/login', { state: { from: '/cart' } });
    },2000)
    return;
  }

  await displayRazorpay();
  };

  const subtotal = cartItems.reduce(
    (acc, item, index) => acc + item.price * quantities[index],
    0
  );

  if(cartItems.length === 0)
    return (
       <div >
        <div className='emptycart-container'>
            <img src={emptycart} alt="" style={{width:"146px", height:"165px"}}/>
            <span className='fw-bold fs-5' style={{color:"#424553"}}>Hey, it feels so light!</span>
            <p className='p-3 text-center' style={{color:"#7e818c"}}>There is nothing in your bag, Lets' add some items. </p>
            <div className='mt-3'>
              <Link className='fw-bold px-4 py-2 text-decoration-none ' to='/'  style={{color:"#ff3f6c",backgroundColor:"#fff",border:"2px solid #ff3f6c"}}>ADD ITEMS FROM WHISLIST</Link>
            </div>
        </div>
      
        
       </div>
  )

  return (
    <div className='cart-page ' >
      <div className='cart_heading border px-4 py-2'>
        <div className='d-flex align-items-center gap-5 '>
           <Link to ='/' className='fs-4 text-dark d-flex align-items-center fw-normal '>  <TfiArrowLeft /></Link> 
            <span className='m-0 fs-4' style={{color:"#424553"}}>SHOPPING BAG</span>
        </div>
       {/* <p className="mt-3" >Price</p> */}
      </div>
      {/* <hr /> */}
<div className='container mt-5'> 
  <div className='cart-items p-4'>
        {cartItems?.map((item, index) => (
          <div key={item._id} className='card p-3 d-flex flex-column mb-4'>  
            <div>
              <div className='d-flex justify-content-between gap-3'>
                <div className='cart-content d-flex gap-2'>
                  <p>{index + 1}</p>
                  <img className='card'
                    src={item.image}
                    style={{ width: '111px', height: '148px',  }}
                    alt=''
                  />
                  <div className='card-category d-flex  gap-2'>
                    <span className='fs-6 fw-bold'>{item.title}</span>
                    <span className='fs-6'>{item.description.slice(0,44)}...</span>
                    <div className='d-flex align-items-start'>
                      <div className='quantity-controls'>
                        <button onClick={() => handleQuantityChange(index, -1)}>-</button>
                        <span className='mx-2'>{quantities[index]}</span>
                        <button onClick={() => handleQuantityChange(index, 1)}>+</button>
                      </div>
                    
                    </div>
                  </div>
                </div>
                <div className=' d-flex align-items-end flex-column gap-4'> 
                       <span className=''
                        onClick={() => handleRemove(item._id)}><RxCross2 /></span>
                    <p className='mt-2 price ' style={{ fontWeight: "bold", fontSize: "18px" }}>
                          ${(item.price * quantities[index]).toFixed(2)}
                        </p>
                </div>
               
              </div>
            </div>
            {/* <hr className='hr' />  */}
          </div>
        ))}
      </div>
      <div className='px-4'>
        <div className="text-end mt-4 fw-bold " style={{ fontSize: "16px" }}>
       <span className='fs-6'>  Total Amount: </span>
         <span className='fw-normal'>${subtotal.toFixed(2)}</span>
      </div>
      <div className="text-end mt-2">
        <button className="placeOrder-btn mb-5" onClick={handlePayment}>
          CHECKOUT
        </button>
      </div>
      </div>  
      </div>
     

    
    </div>
  );
};

export default Cart;
