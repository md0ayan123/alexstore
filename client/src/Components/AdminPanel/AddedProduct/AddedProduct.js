import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { MdModeEditOutline } from 'react-icons/md';
import { RiDeleteBin5Fill } from "react-icons/ri";
import './AddedProduct.css'
import { get,put,Delete } from '../../../AxiosService';

const AddedProduct = () => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    title: '',
    description: '',
    image: '',
  });

  const [data, setData] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState(null);

  // Fetch product list
  const fetchData = async () => {
    try {
      setLoading(true);
 
      const res =await get(`/products/listed`)

      setData(res.data);
      setError(null);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch product data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Convert file to base64
  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  // Show modal and prefill form
  const handleShow = (product) => {
    setSelectedId(product._id);
    setFormData({
      name: product.name,
      price: product.price,
      title: product.title,
      description: product.description,
      image: product.image,
    });
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
    setFormData({
      name: '',
      price: '',
      title: '',
      description: '',
      image: '',
    });
  };

  const handleChange = async (e) => {
    const { name, value, files } = e.target;

    if (name === 'image') {
      const file = files[0];
      if (file) {
        const base64 = await toBase64(file);
        const base64Data = base64.split(',')[1];
        setFormData((prev) => ({ ...prev, image: base64Data }));
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Update product
  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.price || !formData.title || !formData.description) {
      return toast.warn('Please fill all fields');
    }

    try {
      setUpdating(true);
            // const token = localStorage.getItem("token");
      const res = await put(`/products/${selectedId}`, formData);

      if (res.data.success) {
        toast.success('Product updated successfully');
        fetchData();
        handleClose();
      } else {
        toast.error('Update failed');
      }
    } catch (error) {
      console.error('Update error:', error);
      toast.error('Failed to update product');
    } finally {
      setUpdating(false);
    }
  };

  // Loading / error
  if (loading) return <div className="text-center mt-4">Loading...</div>;
  if (error) return <div className="text-danger text-center mt-4">{error}</div>;

  // delete product
const handleRemove = async (id) => {
  if (!window.confirm("Are you sure you want to delete this product?")) return;

  try {
        // const token = localStorage.getItem("token");
        const res = await Delete(`/products/${id}`);

    if (res.data.success) {
      toast.success("Product deleted successfully");
      fetchData(); 
    } else {
      toast.error("Failed to delete product");
    }
  } catch (error) {
    console.error("Delete error:", error.message);
    toast.error("Error deleting product");
  }
};


  return (
    <>
      {/* Modal */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleUpdate}>
             <div>
                {formData.image && (
                <img
                  src={`data:image/jpg;base64,${formData.image}`}
                  alt="Preview"
                  className="mt-3"
                  style={{ width: '100px', height: 'auto' }}
                />
              )}
              <div className='d-flex flex-wrap gap-3 mb-4'>
                <div className='d-flex '>
               {/* <label className="form-label ">Image</label> */}
                <input
                type="file"
                name="image"
                accept="image/*"
                onChange={handleChange}
                className="form-control mt-3 "
              />
                </div>
                           
              <div>
              <label className="form-label">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>
                  <div className="">
              <label className="form-label">Price</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>
            <div>
              <label className="form-label">Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>
              <div className="">
              <label className="form-label">Description</label>
              <textarea
                type="textarea"
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>
              </div> 
            </div>         

            <Button variant="primary" type="submit" disabled={updating}>
              {updating ? 'Saving...' : 'Save Changes'}
            </Button>
          </form>
        </Modal.Body>
      </Modal>

      {/* Table */}
      <div className="table-responsive">
        <table className="table table-bordered mt-4">
          <thead className="table-dark">
            <tr className='table-text'>
              <th>#</th>
              <th>Product Image</th>
              <th>Name</th>
              <th>Price</th>
              <th>Title</th>
              <th>Description</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data?.result?.map((product, index) => (
              <tr key={product._id}>
                <th>{index + 1}</th>
                <td>
                  <img
                    src={product.image.length > 300? "data:image/jpg;base64," + product.image:product.image}
                    alt="product"
                    width="50"
                    height="50"
                  />
                </td>
                <td>{product.name}</td>
                <td>${product.price}</td>
                <td>{product.title.slice(0, 22)}</td>
                <td>{product.description.slice(0, 32)}...</td>
                <td className='d-flex gap-3'>
                  <Button variant="info" onClick={() => handleShow(product)}>
                    <MdModeEditOutline />
                  </Button>
                 <Button variant="danger" onClick={() => handleRemove(product._id)}>
                    <RiDeleteBin5Fill />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default AddedProduct;
