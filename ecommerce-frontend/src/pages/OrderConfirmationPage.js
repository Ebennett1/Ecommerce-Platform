import React from 'react';

const OrderConfirmationPage = ({ order }) => {
  return (
    <div className="container">
      <div className="notification is-success">
        <h1 className="title is-2">Order Confirmation</h1>
        <p>Thank you for your purchase!</p>
      </div>
      <div className="box">
        <h2 className="title is-4">Order Details</h2>
        <p><strong>Order ID:</strong> {order.id}</p>
        <p><strong>Total Price:</strong> ${order.total_price}</p>
        <p><strong>Status:</strong> {order.status}</p>
        <ul>
          {order.items.map(item => (
            <li key={item.id} className="box">
              <p><strong>{item.product.name}</strong></p>
              <p>Quantity: {item.quantity}</p>
              <p>Price: ${item.price}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default OrderConfirmationPage;
