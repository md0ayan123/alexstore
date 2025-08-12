import { Routes, Route } from 'react-router-dom';
import AdminLayout from '../Components/AdminPanel/AdminLayout/AdminLayout';
import CreateProduct from '../Components/AdminPanel/CreateProduct/CreateProduct';
import AddedProduct from '../Components/AdminPanel/AddedProduct/AddedProduct';
import OrderList from '../Components/AdminPanel/OrderList/OrderList';
import Dashboard from '../Components/AdminPanel/Dashboard/Dashboard';
import ProtectedRoute from '../Routes.js/ProtectedRoutes';
import LoginAdmin from '../Components/AdminPanel/LoginAdmin/LoginAdmin'

const AdminRoutes = () => {
  return (
    <Routes>
      <Route 
        path="/admin" 
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >      
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="createproduct" element={<CreateProduct />} />
        <Route path="productlist" element={<AddedProduct />} />
        <Route path="order-list" element={<OrderList />} />
      </Route>
        <Route path='/admin/login' element={<LoginAdmin/>}/>          
    </Routes>
  );
};

export default AdminRoutes;
