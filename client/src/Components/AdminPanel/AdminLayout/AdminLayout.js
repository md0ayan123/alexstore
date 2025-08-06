import { Outlet } from 'react-router-dom';
import SideBar from '../SideBar/SideBar';

const AdminLayout = () => {
  return (
    <div className="row w-100">
      

        <div className="col-2 col-md-2 ">
          <SideBar />
        </div>

        <div className='col-10  col-md-10 '> 
          <Outlet />
        </div>
      </div>
 
  );
};

export default AdminLayout;

