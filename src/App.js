import './App.css';
import { CartProvider } from '././Components/context/cart._context';
import Home from './Screens/Home/Home'
import Login from './Screens/Login/Login'
import Cart from './Components/Cart/Cart'
import { BrowserRouter,Routes,Route } from 'react-router-dom';
 import { ToastContainer } from 'react-toastify';
 import PaymentSuccess from './Components/PaymentSuccess';
import CreateProduct from './Components/AdminPanel/CreateProduct/CreateProduct';
import LoginAdmin from './Components/AdminPanel/LoginAdmin/LoginAdmin';


function App() {
  return (
    <>
    <CartProvider>
  <BrowserRouter>
  <ToastContainer />
  <Routes>
  <Route path='/' element={<Login/>} />
  <Route path='/home' element={<Home/>} />
  <Route path='/cart' element={<Cart/>} />
  <Route path='/admin/createproduct' element={<CreateProduct/>} />
  <Route path='/owner/login' element={<LoginAdmin/>} />
   <Route path="/payment-success" element={<PaymentSuccess />} />
  </Routes>
   
  </BrowserRouter>
  </CartProvider>
  </>
  );
}

export default App;
