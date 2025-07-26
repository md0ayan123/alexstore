import { Link } from 'react-router-dom'
import { MdDashboard } from "react-icons/md";
import { FaShoppingCart } from "react-icons/fa";
import { FaProductHunt } from "react-icons/fa";
import { FaSignOutAlt } from "react-icons/fa";
import { SiAppstore } from "react-icons/si";
import { AiFillProduct } from "react-icons/ai";

const SideBar = () => {
    return (
        <div>
            <div className="container" >
                <div className="row flex-nowrap position-fixed">
                    <div className="border">
                                <li className='text-decoration-none d-flex align-items-center justify-content-center mt-3 mb-2 border border-dark bg-dark
                                '>
                                    <Link to='/login' className="d-flex align-items-center  justify-content-center text-white text-decoration-none ">
                                        <span className="fs-5 fw-bolder d-none d-sm-inline text-white">Menu</span>
                                    </Link>
                                </li>
                        <div className="d-flex flex-column align-items-center  px-3 pt-2 text-white min-vh-100 justify-content-between">
                            <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start gap-3" id="menu">
                                <li className="nav-item">
                                    <Link to="/" className="nav-link align-middle px-0 text-dark">
                                        <SiAppstore />
                                        <span className="ms-1 d-none d-sm-inline text-dark fw-bold">Alex Store</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/admin/dashboard" data-bs-toggle="collapse" className="nav-link px-0 align-middle text-dark">
                                        <MdDashboard />
                                        <span className="ms-1 d-none d-sm-inline text-dark fw-bold">Dashboard</span> </Link>

                                </li>
                                <li>
                                    <Link to="/admin/order-list" className="nav-link px-0 align-middle text-dark">
                                        <FaShoppingCart />
                                        <span className="ms-1 d-none d-sm-inline text-dark fw-bold">Order List</span></Link>
                                </li>

                                <li>
                                    <Link to="/admin/productlist" data-bs-toggle="collapse" className="nav-link px-0 align-middle text-dark ">
                                        <FaProductHunt />
                                        <span className="ms-1 d-none d-sm-inline text-dark fw-bold">Product List</span> </Link>

                                </li>
                                <li>
                                    <Link to="/admin/createproduct" className="nav-link px-0 align-middle text-dark ">
                                      <AiFillProduct />
                                        <span className="ms-1 d-none d-sm-inline text-dark fw-bold">Create Product</span>
                                         </Link>
                                </li>
                            </ul>
                            <ul className='d-flex align-items-center align-items-sm-start px-3 pt-2 mb-5 '>  
                              <li> 
                               <Link to='/logout' className='text-decoration-none d-flex align-items-center text-dark '>
                                <FaSignOutAlt />
                                    <span className='ms-1 d-none d-sm-inline text-dark fw-bold '>Signout</span>
                                </Link>
                            </li>
                            </ul>
                           

                            <hr />

                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default SideBar
