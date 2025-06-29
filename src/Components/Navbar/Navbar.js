import React from 'react'
import './Navbar.css'
import { useState } from 'react'
import {useNavigate,Link} from 'react-router-dom'
import { useCart } from '../context/cart._context'
// import Cart from '../Cart'

const Navbar = () => {
  const navigate=useNavigate()
  let data=useCart()
  
  const handleLogOut=()=>{
    sessionStorage.clear()
   
    navigate('/')
   
  }
  return (
    <div >
      <ul className='nav-heading'>
      <li className='flex-grow-1' style={{fontSize:'33px',fontWeight:"semibold"}}>Alex Store</li>
      <div className='nav-cart'>
      <Link className='btn bg-white text-success mx-2  cart-btn ' to ="/cart">My Cart <span className=" badge rounded-pill bg-danger mx-1" >{data.length}</span></Link>
           <button className='btn bg-danger text-white mx-2  logout-btn' onClick={handleLogOut}>logout</button>
      </div>
      </ul>
    </div>
  )
  {/* <div className='btn bg-white text-success mx-2'  onClick={()=>{setCartView(true)}}>My Cart <span className=" badge rounded-pill bg-danger" >
    {data.length}</span></div> */}
    {/* {cartView ? <Modal onClose={()=>setCartView(false)}><Cart/></Modal> : null} */}
    {/* <button className='btn bg-danger text-white mx-2' onClick={handleLogOut}>logout</button> */}
  }

export default Navbar
