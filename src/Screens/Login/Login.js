import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import './login.css'
import { baseUrl } from '../../utils/constant';

const Login = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: ''
  });

  const navigate = useNavigate()
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
      alert(`User ${isSignIn ? 'registered' : 'logged in'} successfully`);

      setFormData({
        fullName: '',
        email: '',
        password: ''
      });
      if (!isSignIn) {
        navigate('/home')
      }
    } catch (error) {
      console.log(`User ${isSignIn ? 'registration' : 'login'} failed`, error.response ? error.response.data : error);
      alert(`User ${isSignIn ? 'registration' : 'login'} failed: ${error.response?.data?.message || 'Something went wrong'}`);
    }
  };

  return (
    <div style={{ backgroundColor: 'rgba(50, 50, 50, 0.1)', minHeight: '100vh' }}>
      <h2 className="p-4">Alex Store</h2>
      <div className="container d-flex justify-content-center  align-items-center">
        <form className="form-input p-5 border" onSubmit={handleSubmit}>
          <h2 className='d-flex justify-content-center mt-2'>{isSignIn ? 'Create your account' : 'Login'}</h2>

          {isSignIn && (
            <div className="input-box">
              <label className="form-label">Full Name</label>
              <input
                className="input p-2"
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
              />
            </div>
          )}

          <div className="input-box">
            <label className="form-label">Email</label>
            <input
              className="input p-2"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-box">
            <label className="form-label">Password</label>
            <input
              className="input p-2"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <button
            className="mt-3 bg-secondary p-3  rounded"
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
  );
};

export default Login;
