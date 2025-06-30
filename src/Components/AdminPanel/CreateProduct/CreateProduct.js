
import axios from 'axios'
import './createProduct.css'

import { useState } from 'react';
import { baseUrl } from '../../../utils/constant';
// import { useNavigate } from 'react-router-dom';

const CreateProduct = () => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    title: '',
    description: '',
    image: '',
  });
// const navigate=useNavigate()
  const handleChange = async (e) => {
    if (e.target.name === 'image') {
      const file = e.target.files[0];
      if (file) {
        const base64 = await toBase64(file);
       const base64Data=base64.split(',')[1]
        setFormData({ ...formData, image: base64Data });
      }
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const toBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.image) {
      alert("Please select an image");
      return;
    }
    
    const payload = {
      name: formData.name,
      price: formData.price,
      title: formData.title,
      description: formData.description,
      image: formData.image
    };
    console.log("Payload sending to backend:", payload);
     
    try {
      const res = await axios.post(`${baseUrl}/products/create`, payload, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      console.log(res.data);
      alert('Product created successfully!');
      // navigate('/admin/createproduct')
    } catch (err) {
      console.error(err);
      alert('Error creating product');
    }
  };

  return (
    <div className='create-product'>
       <form className='form-input p-5 border' onSubmit={handleSubmit}>
        <h1 className='d-flex justify-content-center'>Create Product </h1>
      <div className='input-box '>
          <label className='form-label'>Product Name</label>
         <input className="input p-2" type="text" name="name"  onChange={handleChange} required />
      </div>
      
      <div className='input-box '>
          <label className='form-label'>Price</label>
        <input className='input p-2' type="text" name="price" onChange={handleChange} required />
      </div>
      
      <div className='input-box '>
          <label className='form-label p-0'>Title</label>
        <input className='input p-2' type="text" name="title"  onChange={handleChange} required />
      </div>  
     
     <div className='input-box'>
        <label className='form-label'>Description</label>
      <textarea className='input'  name="description"  onChange={handleChange} required></textarea>
     </div>

        <div class="mb-3">
        <label for="formFile" class="form-label">Default file input example</label>
        <input class="form-control" type="file" name='image' accept='image/*' id="formFile" onChange={handleChange}/>
      </div>

      <button  className='btn bg-secondary rounded p-3 ' type="submit">Create Product</button>

    </form></div>
   
  );
};

export default CreateProduct;