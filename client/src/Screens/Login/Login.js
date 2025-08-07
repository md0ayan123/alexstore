import { useState } from 'react';
import axios from 'axios';
import { useLocation,useNavigate } from 'react-router-dom'
import './login.css'
import { baseUrl } from '../../utils/constant';

 import { toast } from 'react-toastify';
import logo from '../../assets/aLEX.png';
const Login = () => {
  const [isSignIn, setIsSignIn] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: ''
  });

  const navigate = useNavigate()

  const location = useLocation();
const from = location.state?.from || '/';  // Default redirect is home

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const url = isSignIn
        ? `${baseUrl}/user/register`
        : `${baseUrl}/user/signup`;

      const response = await axios.post(url, formData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      console.log(`User ${isSignIn ? 'registered' : 'logged in'} successfully`, response.data);
      toast.success(`User ${isSignIn ? 'registered' : 'logged in'} successfully`);

      setFormData({
        fullName: '',
        email: '',
        password: ''
      });
      if (!isSignIn) {
         localStorage.setItem('token', JSON.stringify(response.data.user || response.data));
        navigate(from)
      }
    } catch (error) {
      console.log(`User ${isSignIn ? 'registration' : 'login'} failed`, error.response ? error.response.data : error);
     toast.error(`User ${isSignIn ? 'registration' : 'login'} failed: ${error.response?.data?.message || 'Something went wrong'}`);
    }
  };

  return (
    <div className='vh-100' >
      <div className='nav-login border'>
      <img src={logo} alt="" className='px-4 py-2' style={{width:"180px"}} />
      {/* <span className='fs-3 px-4 py-2 fst-italic'>ALEX STORE</span> */}
    </div>
  <div style={{ background:"linear-gradient(to bottom right,#feedf6,#fcf0e2)",minHeight:"92vh" ,display:"flex", justifyContent:"center", alignItems:"center"}}>  
       <div className='d-flex justify-content-center  p-5 '> 
        <form className="auth-form p-md-5 p-3 border " onSubmit={handleSubmit}>
          <h2 className='form-heading  d-flex justify-content-center align-items-center mt-2'>{isSignIn ? 'Create your account' : 'Login'}</h2>

          {isSignIn && (
            <div className="box-input w-100">
              <label className="form-label">Full Name</label>
              <input
                className="rounded p-1 w-100"
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
              />
            </div>
          )}

          <div className="box-input">
            <label className="form-label">Email</label>
            <input
              className="rounded p-1 w-100"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="box-input">
            <label className="form-label">Password</label>
            <input
              className="rounded p-1 w-100"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <button
            className="mt-3 rounded p-2 w-100"
            style={{backgroundColor:"#ff3f6c" ,color:"#ffff" }}
            type="submit"
            disabled={
              isSignIn
                ? !formData.fullName || !formData.email || !formData.password
                : !formData.email || !formData.password
            }
          >
            {isSignIn ? 'Create Account' : 'Login'}
          </button>

          <div className="mt-3">
            {isSignIn ? (
              <>
                Already have an account?{' '}
                <span
                  style={{ cursor: 'pointer', color: 'deeppink', textDecoration: 'underline' }}
                  onClick={() => setIsSignIn(false)}
                >
                  Sign in
                </span>
              </>
            ) : (
              <>
                Don't have an account?{' '}
                <span
                  style={{ cursor: 'pointer', color: 'deeppink', textDecoration: 'underline' }}
                  onClick={() => setIsSignIn(true)}
                >
                  Register
                </span>
              </>
            )}
          </div>
        </form>
        </div>
      </div>
        </div>
     
      

    
            
 
  );
};

export default Login;
