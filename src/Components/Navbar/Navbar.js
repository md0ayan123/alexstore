import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/cart._context';
import { toast } from 'react-toastify';
import searchIcon from '../../assets/searchicon.png';
import logo from '../../assets/ALEX-LOGO.png';
import shopCartIcon from '../../assets/shopping-bag-icon.jpg';
import './Navbar.css';


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

            <div className='nav-heading d-flex flex-column justify-content-between'>
                    <div className=' nav-content d-flex justify-content-between w-100'>
               <div className='nav-logo ml-4'>
              <img src={logo} alt=""  className='logo' style={{width:"150px"}}/>
            </div>
              <div className="nav-cart ">
                <Link  to="/cart" className='d-flex align-items-center'>
                  <img src={shopCartIcon} alt="Cart" className='cart-icon'   />
                  <span
                    className="badge rounded-pill bg-danger"
                    style={{ position: 'relative', top: '-17px', left: '-17px' }}
                  >
                    {cartItems.length}
                  </span>
                </Link>
                {isToken ? (
                  <button
                    className="btn bg-danger text-white mx-2 logout-btn"
                    onClick={handleLogOut}
                  >
                    Logout
                  </button>
                ) : (
                  <Link to="/login" className="login-sigup px-1 py-1" style={{fontSize:"12px"}}>
                    LOGIN/SIGNUP
                  </Link>
                )}
              </div>
            </div>
            <div className="nav-search-bar w-100">
               <div className="search-box d-flex align-items-center py-1" style={{
                  border: "1px solid #ccc",
                  borderRadius: "2px",
                  backgroundColor: "#fff"
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
                      backgroundColor: "#fff",
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
                   <div className='nav-heading'>
               <div className='nav-logo'>
              <img src={logo} alt="" className='logo' style={{width:"220px"}}/>
            </div>
              <div className="nav-search-bar">
               <div className="search-box d-flex align-items-center py-1" style={{
                                 border: "1px solid #ccc",
                                 borderRadius: "2px",
                                 backgroundColor: "#fff"
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
                                     backgroundColor: "#fff",
                                     width: "300px",
                                     borderRadius: "2px",
                                     height: "15px"
                                   }}
                                 />
                               </div>
              </div>
                <div className="nav-cart">
                <Link className="cart-btn" to="/cart">
                  <img src={shopCartIcon}  alt="Cart" style={{ width: '40px' }} />
                  <span
                    className="badge rounded-pill bg-danger"
                    style={{ position: 'relative', top: '-17px', left: '-17px' }}
                  >
                    {cartItems.length}
                  </span>
                </Link>
                {isToken ? (
                  <button
                    className="btn bg-danger text-white mx-2 logout-btn"
                    onClick={handleLogOut}
                  >
                    Logout
                  </button>
                ) : (
                  <Link to="/login" className="login-sigup px-4 py-2">
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
