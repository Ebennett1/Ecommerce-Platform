import React from 'react';

const OrderConfirmationPage = ({ order }) => {
  return (
    <div>
      <h1>Order Confirmation</h1>
      <p>Thank you for your purchase!</p>
      <h2>Order Details</h2>
      <p>Order ID: {order.id}</p>
      <p>Total Price: ${order.total_price}</p>
      <p>Status: {order.status}</p>
      <ul>
        {order.items.map(item => (
          <li key={item.id}>
            {item.product.name} - Quantity: {item.quantity} - Price: ${item.price}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderConfirmationPage;
