import React from 'react';


const DocumentationPage = () => {
  return (
    <div className="container py-5 documentation">
      <h1 className="mb-4">📘 E-Commerce Website Documentation</h1>

      <section>
        <h3>1. Project Overview</h3>
        <p>
          <strong>Alex Store</strong> is a modern full-stack e-commerce platform built using the MERN stack. 
          It enables users to browse products, add items to cart, checkout securely via Razorpay, and track orders.
        </p>
      </section>

      <section>
        <h3>2. Objective</h3>
        <p>
          To build a scalable and responsive e-commerce platform supporting payment integration and admin-level order management.
        </p>
      </section>

      <section>
        <h3>3. Tech Stack</h3>
        <ul>
          <li><strong>Frontend:</strong> React.js, Axios, React Router, Bootstrap</li>
          <li><strong>Backend:</strong> Node.js, Express.js, MongoDB (Mongoose)</li>
          <li><strong>Payments:</strong> Razorpay SDK</li>
          <li><strong>Tools:</strong> Postman, Vercel/Render, GitHub</li>
        </ul>
      </section>

      <section>
        <h3>4. Features</h3>
        <ul>
          <li>User-side product listing and cart management</li>
          <li>Secure payment integration via Razorpay</li>
          <li>Order confirmation and admin dashboard</li>
          <li>Update/Delete orders by admin</li>
        </ul>
      </section>

      <section>
        <h3>5. API Endpoints</h3>
        <pre className="bg-light p-3 rounded">
POST   /payment/orders       → Create Razorpay order{'\n'}
POST   /payment/success      → Verify and store payment{'\n'}
GET    /order/listed         → List all orders{'\n'}
GET    /order/:id            → Get specific order{'\n'}
PUT    /order/:id            → Update order status{'\n'}
DELETE /order/:id            → Delete order
        </pre>
      </section>

      <section>
        <h3>6. Future Enhancements</h3>
        <ul>
          <li>User authentication (login/signup)</li>
          <li>Product filtering & search</li>
          <li>Email notifications</li>
          <li>Mobile optimization</li>
        </ul>
      </section>

      <section>
        <h3>7. Author</h3>
        <p>
          Developed by <strong>Md Ayan</strong><br />
          GitHub: <a href="https://github.com/md0ayan123" target="_blank" rel="noreferrer">md0ayan123</a>
        </p>
      </section>
    </div>
  );
};

export default DocumentationPage;
