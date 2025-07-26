import { Outlet } from 'react-router-dom';
// import AdminNavbar from '../adminNavbar/AdminNavbar';
import SideBar from '../SideBar/SideBar';

const AdminLayout = () => {
  
  return (
    <div className="d-flex justify-content-">
    
      <div className="w-64 fixed h-screen">
        <SideBar />
      </div>
      <div className=" w-full container " style={{marginRight:"0px"}}>
        <Outlet/>
      </div>
    </div>
  );
};

export default AdminLayout;
