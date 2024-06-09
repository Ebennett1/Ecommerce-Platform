import React, { useEffect, useState } from 'react';
import axios from '../api/axios';

const OrderHistoryPage = () => {
  const [orders, setOrders] = useState([]);  // State to manage the list of orders
  const [error, setError] = useState('');  // State to manage error messages

  // Fetch order history when the component mounts
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
        setError('Please Sign in To View Order history.'); 
      }
    };

    fetchOrderHistory();
  }, []);

  // Clear order history
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

  // Reorder items from a past order
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
    <div className='order-history-div container'>
      <h1 className="title is-1">Order History</h1>
      <button className='button is-danger clear-history-button' onClick={handleClearHistory}>Clear Order History</button>
      {error && <p className="notification is-danger">{error}</p>}
      {orders.length === 0 ? (
        <p className="has-text-centered">You have no orders.</p>
      ) : (
        <ul className='order-list'>
          {orders.map(order => (
            <li key={order.id} className='box'>
              <h2 className="title is-4"><u>Order {order.id}</u> </h2>
              <p>Total Price: ${order.total_price}</p>
              <p>Status: {order.status}</p>
              <ul className='order-item-list'>
                {order.items.map(item => (
                  <li key={item.id} className='order-product media'>
                    {item.product.image && (
                      <figure className="media-left">
                        <img src={item.product.image} alt={item.product.name} className="image is-64x64"/>
                      </figure>
                    )}
                    <div className="media-content">
                      {item.product.name} Quantity: {item.quantity} - Price: ${item.price}
                    </div>
                  </li>
                ))}
              </ul>
              <button className='button is-success reorder-button' onClick={() => handleReorder(order.id)}>Reorder</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default OrderHistoryPage;
