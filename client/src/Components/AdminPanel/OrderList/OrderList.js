import './orderlist.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { baseUrl } from '../../../utils/constant';
import { toast } from 'react-toastify';
import { MdModeEditOutline } from "react-icons/md";
import { RiDeleteBin5Fill } from "react-icons/ri";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const OrderList = () => {
  const [data, setData] = useState({ result: [] });
  const [selectedId, setSelectedId] = useState(null);
  const [status, setStatus] = useState("");
  const [show, setShow] = useState(false);

  useEffect(() => {
    fetchOrderList();
  }, []);

  const fetchOrderList = async () => {
    try {
      const res = await axios.get(`${baseUrl}/order/listed`);
      setData(res.data);
    } catch (err) {
      console.error("Failed to fetch orders", err);
      toast.error("Failed to fetch orders");
    }
  };

  const handleShow = () => setShow(true);
  const handleClose = () => {
    setShow(false);
    setSelectedId(null);
    setStatus("");
  };

  const handleUpdate = async () => {
    try {
      const res = await axios.put(`${baseUrl}/order/${selectedId}`, { status });

      if (res.data.success) {
        toast.success("Order updated successfully");

        
        setData((prev) => ({
          ...prev,
          result: prev.result.map(order =>
            order._id === selectedId ? { ...order, status } : order
          )
        }));

        handleClose();
      }
    } catch (error) {
      console.error("Update failed", error);
      toast.error("Failed to update order");
    }
  };

  const handleRemove = async (_id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this order?");
    if (!confirmDelete) return;

    try {
      const res = await axios.delete(`${baseUrl}/order/${_id}`);
      if (res.data.success) {
        setData((prev) => ({
          ...prev,
          result: prev.result.filter(order => order._id !== _id)
        }));
        toast.success("Order deleted successfully");
      }
    } catch (err) {
      console.error("Failed to delete order", err);
      toast.error("Failed to delete order");
    }
  };

  if (!data.result.length) {
    return (
      <div className="no-order-container">
        <p>No orders found</p>
      </div>
    );
  }

  return (
    <>
      {/* Edit Modal */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update Order Status</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="form-group mt-3">
            <label>Status</label>
            <select
              className="form-control w-50"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="Processing">Processing</option>
              <option value="Shipped">Shipped</option>
              <option value="Delivered">Delivered</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Close</Button>
          <Button variant="primary" onClick={handleUpdate}>Update</Button>
        </Modal.Footer>
      </Modal>

      {/* Orders Table */}
      <div className='orderlist-page container mt-3'>
        <div className="ordersList-container">
          <h3 className='d-flex justify-content-center mt-4 mb-4'>All Orders</h3>
          <table className="table table-bordered">
            <thead>
              <tr className='table-dark'>
                <th>Sl no</th>
                <th>Order ID</th>
                <th>Payment ID</th>
                <th>Status</th>
                <th>Total Price</th>
                <th>Items</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.result.map((order, index) => (
                <tr key={order._id}>
                  <td>{index + 1}</td>
                  <td>{order.razorpayOrderId}</td>
                  <td>{order.razorpayPaymentId}</td>
                  <td>{order.status || "Processing"}</td>
                  <td>${order.amount}</td>
                  <td>{order.cartItems?.length || 0}</td>
                  <td className='d-flex gap-3'>
                    <Button
                      variant="info"
                      onClick={() => {
                        setSelectedId(order._id);
                        setStatus(order.status || "Processing");
                        handleShow();
                      }}
                    >
                      <MdModeEditOutline />
                    </Button>
                    <Button
                      variant='danger'
                      onClick={() => handleRemove(order._id)}
                    >
                      <RiDeleteBin5Fill />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default OrderList;
