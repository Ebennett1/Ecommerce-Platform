import React, { useEffect, useState } from 'react';
import axios from '../api/axios';

const OrderHistoryPage = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOrderHistory = async () => {
      try {
        const token = JSON.parse(localStorage.getItem('authTokens')).access;
        const config = {
          headers: {
            Authorization: `Bearer ${token}`
          }
        };
        const response = await axios.get('/order-history/', config);
        setOrders(response.data);
      } catch (error) {
        console.error('Error fetching order history:', error);
        setError('Error fetching order history.');
      }
    };

    fetchOrderHistory();
  }, []);

  const handleClearHistory = async () => {
    try {
      const token = JSON.parse(localStorage.getItem('authTokens')).access;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };
      await axios.delete('/order-history/clear/', config);
      setOrders([]);
    } catch (error) {
      console.error('Error clearing order history:', error);
      setError('Error clearing order history.');
    }
  };

  const handleReorder = async (orderId) => {
    try {
      const token = JSON.parse(localStorage.getItem('authTokens')).access;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };
      await axios.post(`/order-history/reorder/${orderId}/`, {}, config);
      alert('Items added to cart');
    } catch (error) {
      console.error('Error reordering:', error);
      setError('Error reordering items.');
    }
  };

  return (
    <div>
      <h1>Order History</h1>
      <button className='back-button' onClick={handleClearHistory}>Clear Order History</button>
      {error && <p className="error-message">{error}</p>}
      {orders.length === 0 ? (
        <p>You have no orders.</p>
      ) : (
        <ul>
          {orders.map(order => (
            <li key={order.id}>
              <h2>Order {order.id}</h2>
              <p>Total Price: ${order.total_price}</p>
              <p>Status: {order.status}</p>
              <ul>
                {order.items.map(item => (
                  <li key={item.id}>
                    {item.product.name} - Quantity: {item.quantity} - Price: ${item.price}
                  </li>
                ))}
              </ul>
              <button onClick={() => handleReorder(order.id)}>Reorder</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default OrderHistoryPage;
