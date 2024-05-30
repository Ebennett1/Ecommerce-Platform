import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CartContext from '../context/CartContext';
import axios from '../api/axios';

const CheckoutPage = () => {
  const { cart, fetchCart } = useContext(CartContext);
  const navigate = useNavigate();
  const [orderSuccess, setOrderSuccess] = useState(false);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  // Calculate the total price of the cart
  const totalPrice = cart.items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  const handleCheckout = async () => {
    try {
      const token = JSON.parse(localStorage.getItem('authTokens')).access;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };
      const response = await axios.post('/orders/create/', {}, config); // Sending empty object as data
      setOrderSuccess(true);
      console.log('Order created:', response.data);
    } catch (error) {
      console.error('Failed to create order', error);
      if (error.response) {
        console.error('Error response data:', error.response.data);
        console.error('Error response status:', error.response.status);
      }
    }
  };

  if (orderSuccess) {
    return (
      <div>
        <h1>Order Successful!</h1>
        <button onClick={() => navigate('/products')}>Back to Products</button>
      </div>
    );
  }

  return (
    <div>
      <h1>Checkout</h1>
      <h2>Order Summary</h2>
      {cart.items.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <ul>
          {cart.items.map(item => (
            <li key={item.id}>
              {item.product.name} - Quantity: {item.quantity} <br/>
              ${item.product.price} each
            </li>
          ))}
        </ul>
      )}
      <h3>Total Price: ${totalPrice.toFixed(2)}</h3>
      <button className='back-button' onClick={() => navigate('/cart')}>Back to Cart</button>
      <button className='order-button' onClick={handleCheckout}>Place Order</button>
    </div>
  );
};

export default CheckoutPage;
