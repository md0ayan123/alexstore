import axios from 'axios'
import { useState } from 'react'
import './loginAdmin.css'
import {useNavigate} from 'react-router-dom'

const LoginAdmin = () => {
    const navigate=useNavigate()
    const [formData,setFormData]=useState({
       
        email:"",
        password:""
    })
    const handleChange=(e)=>{
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
     const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const res = await axios.post('http://localhost:5000/owner/login', formData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      console.log('Login success:', res.data);
      alert('Login successful!');

      // Redirect or store token if needed
       localStorage.setItem('token', res.data.token);
       navigate('/admin/createproduct')
       

    } catch (err) {
      console.error('Login failed:', err.response ? err.response.data : err);
      alert('Login failed: ' + (err.response?.data?.message || 'Unknown error'));
    }

}
  return (
    <div style={{ backgroundColor: 'rgba(50, 50, 50, 0.1)', minHeight: '100vh'}}>
  <h2 className='p-3'>Alex Store</h2>  
    <div className='d-flex justify-content-center mt-5   '> 
     <form className="form-input p-5 border" onSubmit={handleSubmit}>
        <h2 className='d-flex justify-content-center'>Login Admin </h2>
   
      <div className="input-box">
        <label className="form-label">Email</label>
        <input className='input'
          type="email"
          name="email"
          onChange={handleChange}
          required
        />
      </div>

      <div className="input-box">
        <label className="form-label ">Password</label>
        <input className='input'
          type="password"
          name="password"
          onChange={handleChange}
          required
        />
      </div>

      <button className="mt-3 bg-secondary p-3  rounded" type="submit">
        Login
      </button>
    </form>
    </div>
    </div>

 
  )
}
export default LoginAdmin
