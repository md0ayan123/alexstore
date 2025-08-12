import './App.css';
import { CartProvider } from '././Components/context/cart._context';
import Home from './Screens/Home/Home';
import Login from './Screens/Login/Login';
import Cart from './Components/Cart/Cart';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import PaymentSuccess from './Components/PaymentSuccess';
import LoginAdmin from './Components/AdminPanel/LoginAdmin/LoginAdmin';
// import EditOrder from './Components/AdminPanel/EditOrder/EditOrder';
import AdminRoutes from './Routes.js/AdminRoutes';
// import NavbarRoutes from './Routes.js/NavbarRoutes';

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <ToastContainer />
        <Routes>
          <Route path='/signin' element={<Login />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/' element={<Home />} />
          <Route path='/payment-success' element={<PaymentSuccess />} />
          <Route path='/adminlogin' element={<LoginAdmin />} />/
          {/* <Route path='/admin/order/:id' element={<EditOrder />} /> */}
          
        </Routes>

        {/* Render admin routing structure separately */}
        <AdminRoutes />
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
