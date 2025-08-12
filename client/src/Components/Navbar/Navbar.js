import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/cart._context';
import { toast } from 'react-toastify';
import searchIcon from '../../assets/searchicon.png';
import logo from '../../assets/aLEX.png';
import './Navbar.css';
import { BsHandbag } from "react-icons/bs";


const Navbar = ({onSearch}) => {
  const [isToken, setIsToken] = useState(localStorage.getItem('token'));
  const [isMobileView, setIsMobileView] = useState(window.innerWidth <700);
  const cartItems = useCart();

  // Listen to screen resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 700);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
    
     const [query, setQuery] = useState('');
     
    const handleSearch = (e) => {
    const value = e.target.value;
    setQuery(value);
    if (onSearch) {
      onSearch(value);
    }
  };

  const handleLogOut = () => {
    localStorage.removeItem('token');
    setIsToken(null);
    toast.success("Logout successfully");
  };

  return (
    <div className="navbar-wrapper">
      <ul>
        {/* <div className="nav-logo">
          <img src={logo} className='logo' alt="Logo" style={{ width: '220px' }} />
        </div> */}

    
          {isMobileView ? (

            <> 
            <div>

            <div className='nav-heading d-flex flex-column justify-content-between align-items-center'>
                    <div className=' nav-content d-flex align-items-center justify-content-between w-100'>
               <div className='nav-logo ml-4'>
              <img src={logo} alt=""  className='logo ' style={{width:"100px"}}/>
              {/* <span className='fs-3 fst-italic'>ALEX STORE</span> */}
            </div>
              <div className="nav-cart d-flex">
                <Link  to="/cart" className='p-2' style={{position:"relative" , left:"12px"}}>
                <span className='text-dark fs-6 '>
                       <BsHandbag />
                </span>
            
                  <span
                    className="badge rounded-pill bg-danger"
                    style={{ position: 'relative', top: '-12px', left: '-12px' ,fontSize:"8px" }}
                  >
                    {cartItems.length}
                  </span>
                </Link>
                {isToken ? (
                  <button
                    className="logout-btn px-3 py-1"
                    onClick={handleLogOut}
                  >
                    Logout
                  </button>
                ) : (
                  <Link to="/signin" className="login-sigup px-1 py-1" style={{fontSize:"12px"}}>
                    LOGIN/SIGNUP
                  </Link>
                )}
              </div>
            </div>
            <div className="nav-search-bar w-100 ">
               <div className="search-box d-flex align-items-center py-1" style={{
                  border: "none",
                  borderRadius: "12px",
                  backgroundColor: "#ededed"
                }}>
                  <img src={searchIcon} alt="" style={{
                    width: "20px",
                    height: "20px",
                    marginLeft: "8px",
                    marginRight: "4px"
                  }} />
                  <input
                    type="text"
                    value={query}
                    onChange={handleSearch}
                    placeholder="Search products..."
                    className="search-input border-0 p-2"
                    style={{
                      outline: "none",
                      flex: "1",
                      backgroundColor: "#ededed",
                      width: "300px",
                      borderRadius: "2px",
                      height: "15px"
                    }}
                  />
                </div>
              </div>
            </div>
            </div>
         
           

              
            </>
          ) : (
            <>
            <div>
                   <div className='nav-heading px-4 py-3 d-flex align-items-center'>
               <div className='nav-logo'>
              <img src={logo} alt="" className='logo' style={{width:"130px"}}/>
              {/* <span className='fs-4 fw-normal fst-italic'>ALEX STORE</span> */}
            </div>
              <div className="nav-search-bar">
               <div className="search-box d-flex align-items-center py-1" style={{
                                 border: "none",
                                 borderRadius: "12px",
                                 backgroundColor: "#ededed"
                               }}>
                                 <img src={searchIcon} alt="" style={{
                                   width: "20px",
                                   height: "20px",
                                   marginLeft: "8px",
                                   marginRight: "4px"
                                 }} />
                                 <input
                                   type="text"
                                   value={query}
                                   onChange={handleSearch}
                                   placeholder="Search products..."
                                   className="search-input border-0 p-2"
                                   style={{
                                     outline: "none",
                                     flex: "1",
                                     backgroundColor: "#ededed",
                                     width: "300px",
                                     borderRadius: "2px",
                                     height: "15px"
                                   }}
                                 />
                               </div>
              </div>
                <div className="nav-cart">
                <Link className="cart-btn" to="/cart">
                <span className='fs-3 text-dark'>
                   <BsHandbag />
                </span>
                
                  <span
                    className="badge rounded-pill bg-danger"
                    style={{ position: 'relative', top: '-17px', left: '-17px' }}
                  >
                    {cartItems.length}
                  </span>
                </Link>
                {isToken ? (
                  <button
                    className="logout-btn px-4 py-1"
                    onClick={handleLogOut}
                  >
                    Logout
                  </button>
                ) : (
                  <Link to="/signin" className="login-sigup px-4 py-2">
                    LOGIN/SIGNUP
                  </Link>
                )}
              </div>
            </div>
              
           

            
            </div>
          
            </>
          )}
        
      </ul>
    </div>
  );
};

export default Navbar;
