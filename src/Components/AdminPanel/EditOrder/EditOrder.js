// import { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { baseUrl } from "../../../utils/constant";
//  import { toast } from 'react-toastify';
//  import Button from 'react-bootstrap/Button';
//  import Modal from 'react-bootstrap/Modal';

// const EditOrder = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [order, setOrder] = useState(null);
//     const [show, setShow] = useState(false);
//   const [status, setStatus] = useState("");
//    const handleClose = () => setShow(false);
//   const handleShow = () => setShow(true);

//   useEffect(() => {
//     async function fetchOrder() {
//       try {
//         const res = await axios.get(`${baseUrl}/order/${id}`);
//         setOrder(res.data);
//         setStatus(res.data.status || "Processing");
//       } catch (error) {
//         console.error("Failed to fetch order", error);
//         toast("Could not fetch order details.");
//       }
//     }

//     fetchOrder();
//   }, [id]);

//   const handleUpdate = async () => {
//     try {
//       const res = await axios.put(`${baseUrl}/order/${id}`, { status });
//       if (res.data.success) {
//         toast("Order updated successfully");
//         navigate("/order-list");
//       }
//     } catch (error) {
//       console.error("Update failed", error);
//       toast("Failed to update order");
//     }
//   };

//   if (!order) return <p className="text-center mt-5">Loading order details...</p>;

//   return (
//     <div className="container mt-5">
//          <Modal show={show} onHide={handleClose}>
//         <Modal.Header closeButton>
//           <Modal.Title>Modal heading</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <div className="form-group mt-3">
//         <label>Status</label>
//         <select
//           className="form-control w-50"
//           value={status}
//           onChange={(e) => setStatus(e.target.value)}
//         >
//           <option value="Processing">Processing</option>
//           <option value="Shipped">Shipped</option>
//           <option value="Delivered">Delivered</option>
//           <option value="Cancelled">Cancelled</option>
//         </select>
//       </div>

    
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={handleClose}>
//             Close
//           </Button>
//           <Button variant="primary" onClick={handleUpdate}>
//             Save Changes
//           </Button>
//         </Modal.Footer>
//       </Modal>
//       {/* <h2>Edit Order</h2>
//       <p><strong>Order ID:</strong> {order.razorpayOrderId}</p>
//       <p><strong>Payment ID:</strong> {order.razorpayPaymentId}</p>
//       <p><strong>Amount:</strong> ${order.amount}</p>

//       <div className="form-group mt-3">
//         <label>Status</label>
//         <select
//           className="form-control w-50"
//           value={status}
//           onChange={(e) => setStatus(e.target.value)}
//         >
//           <option value="Processing">Processing</option>
//           <option value="Shipped">Shipped</option>
//           <option value="Delivered">Delivered</option>
//           <option value="Cancelled">Cancelled</option>
//         </select>
//       </div>

//       <button className="btn btn-primary mt-3" onClick={handleUpdate}>
//         Update Order
//       </button> */}
//     </div>
//   );
// };

// export default EditOrder;
