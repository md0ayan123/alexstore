import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'
import './login.css'
import { baseUrl } from '../../utils/constant';
import { toast } from 'react-toastify';
import logo from '../../assets/aLEX.png';
import { post } from '../../AxiosService';
import Loader from '../../Components/common/Loader';

const Login = () => {
  const [isSignIn, setIsSignIn] = useState(false);
  const [isCopied,setIsCopied]=useState(false)
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    // contact: ''
  });
  const[isLoading,SetIsLoading]=useState(false)

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
      SetIsLoading(true);
    e.preventDefault();

    try {
      const url = isSignIn
        ? `${baseUrl}/user/register`
        : `${baseUrl}/user/signin`;

     
      let response = await post(url,formData)
      // console.log(response);
      


      if (response?.data?.status && response.data?.user && response.data.token) {
        localStorage.setItem("user", JSON.stringify(response.data.user));
        localStorage.setItem("token", response.data.token);
        toast.success(`User ${isSignIn ? 'registered' : 'logged in'} successfully`);
        setFormData({ 
        fullName: '', 
        email: '',
        password: '',
        contact: ''
      });
      // console.log(from ,"frommmm")
        //  localStorage.setItem('token', JSON.stringify(response.data.user || response.data));
        navigate(from)
      }

      // console.log(`User ${isSignIn ? 'registered' : 'logged in'} successfully`, response.data);

      
    } catch (error) {
      console.log(error,"errrrr")
      console.log(`User ${isSignIn ? 'registration' : 'login'} failed`, error.response ? error.response.data : error);
      toast.error(`User ${isSignIn ? 'registration' : 'login'} failed: ${error.response?.data?.message || 'Something went wrong'}`);
    }
    finally {
    SetIsLoading(false); // stop loader
  }

  };

  const handleCopyCred=()=>{
    setIsCopied(true)
    setFormData({ 
        email: 'ayan@test.com',
        password: '12341234',
      });
  }

  return (
    <div className='vh-100' >
      <div className='nav-login border'>
        <img src={logo} alt="" className='login-logo px-4 py-2' style={{ width: "180px" }} />
        {/* <span className='fs-3 px-4 py-2 fst-italic'>ALEX STORE</span> */}
      </div>
      <div style={{ background: "linear-gradient(to bottom right,#feedf6,#fcf0e2)", minHeight: "92vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
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
            {isSignIn &&  <div className="box-input">
              <label className="form-label">Mobile Number</label>
              <input
                className="rounded p-1 w-100"
                type="text"
                name="contact"
                value={formData.contact}
                onChange={handleChange}
                required
              />
            </div>}
           
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
            {!isSignIn && <button type='reset' className={`badge border ${isCopied?"bg-secondary":"bg-info"} cursor-pointer`} onClick={handleCopyCred}>{isCopied?"Copied":"Copy Credentials"}</button>}
              <button
                className="mt-3 rounded p-2 w-100"
                style={{ backgroundColor: "#ff3f6c", color: "#ffff" }}
                type="submit"
                disabled={
                  isLoading || (
                    isSignIn
                      ? !formData.fullName || !formData.email || !formData.password
                      : !formData.email || !formData.password
                  )
                }
              >
                {isLoading ? <Loader size={20} color="#fff" /> : (isSignIn ? 'Create Account' : 'Login')}
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
