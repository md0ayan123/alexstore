import { Routes, Route } from 'react-router-dom';
import AdminLayout from '../Components/AdminPanel/AdminLayout/AdminLayout';
import CreateProduct from '../Components/AdminPanel/CreateProduct/CreateProduct';
import AddedProduct from '../Components/AdminPanel/AddedProduct/AddedProduct';
import OrderList from '../Components/AdminPanel/OrderList/OrderList';
import DocumentationPage from '../Components/AdminPanel/DocumentationPage/DocumentationPage';
import SurveyPhoto from '../Components/AdminPanel/surveyPhoto/surveyPhoto';
import GlobelSurveying from '../Components/AdminPanel/globleSurvey/globelSurvey';
import Dashboard from '../Components/AdminPanel/Dashboard/Dashboard';
// import NavbarLayout from '../Components/AdminPanel/AdminLayout/NavbarLayout';

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/admin" element={<AdminLayout />}>      
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="createproduct" element={<CreateProduct />} />
          <Route path="productlist" element={<AddedProduct />} />
          <Route path="order-list" element={<OrderList />} />
          {/* <Route path="documentation" element={<DocumentationPage />} />
          <Route path="surveyphoto" element={<SurveyPhoto />} />
          <Route path="globelsurveying" element={<GlobelSurveying />} /> */}
      </Route>
    </Routes>
  );
};

export default AdminRoutes;
