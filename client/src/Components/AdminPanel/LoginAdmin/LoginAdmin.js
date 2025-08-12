import axios from 'axios'
import { useState } from 'react'
import './loginAdmin.css'
import {useNavigate} from 'react-router-dom'
import { baseUrl } from '../../../utils/constant'
import {toast} from 'react-toastify'
import logo from '../.././../assets/aLEX.png'
import { post } from '../../../AxiosService'

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
      // const res = await axios.post(`${baseUrl}/owner/login`, formData, {
      //   headers: {
      //     'Content-Type': 'application/json'
      //   }
      // });
          const res =await post('/owner/login',formData)
      console.log('Login success:', res.data);
      toast.success('Login successful!');

      // Redirect or store token if needed
       localStorage.setItem('token', res.data.token);
       navigate('/admin/dashboard')
       

    } catch (err) {
      console.error('Login failed:', err.response ? err.response.data : err);
      toast.error('Login failed: ' + (err.response?.data?.message || 'Unknown error'));
    }

}
  return (
    <>
      <div className='nav-admin'>
          <img src={logo} alt="" className='px-4 py-2' style={{width:"180px"}} />
        </div>
    <div style={{ background:"linear-gradient(to bottom right,#feedf6,#fcf0e2)" , minHeight: '92vh',display:"flex", justifyContent:"center", alignItems:"center"}}>
 
    <div className='d-flex justify-content-center mt-5'> 
     <form className="form-input p-md-5 p-5 mb-5" onSubmit={handleSubmit}>
        <h2 className='d-flex justify-content-center'>Admin </h2>
   
      <div className="input-box d-flex gap-1">
        <label className="form-label">Email</label>
        <input className='input'
          type="email"
          name="email"
          onChange={handleChange}
          required
        />
      </div>

      <div className="input-box d-flex gap-1">
        <label className="form-label ">Password</label>
        <input className='input'
          type="password"
          name="password"
          onChange={handleChange}
          required
        />
      </div>

      <button className="mt-3  p-2  rounded" style={{backgroundColor:"#ff3f6c" ,color:"#ffff" }} type="submit">
        Login
      </button>
    </form>
    </div>
    </div>
</>
 
  )
}
export default LoginAdmin
