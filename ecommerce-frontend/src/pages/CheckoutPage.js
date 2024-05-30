import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CartContext from '../context/CartContext';
import axios from '../api/axios';
import OrderConfirmationPage from './OrderConfirmationPage';

const CheckoutPage = () => {
  const { cart, fetchCart } = useContext(CartContext);
  const navigate = useNavigate();
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const handleCheckout = async () => {
    try {
      const token = JSON.parse(localStorage.getItem('authTokens')).access;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };
      const response = await axios.post('/orders/create/', {}, config);
      setOrderDetails(response.data);
      setOrderSuccess(true);
      console.log('Order created:', response.data);
    } catch (error) {
      console.error('Failed to create order', error);
    }
  };

  if (orderSuccess) {
    return <OrderConfirmationPage order={orderDetails} />;
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
              {item.product.image && (
                <img src={item.product.image} alt={item.product.name} className="product-image"/>
              )}
              ${item.product.price} each
            </li>
          ))}
        </ul>
      )}
      <h3>Total Price: ${cart.items.reduce((sum, item) => sum + item.product.price * item.quantity, 0).toFixed(2)}</h3>
      <button className='back-button' onClick={() => navigate('/cart')}>Back to Cart</button>
      <button className='checkout-button' onClick={handleCheckout}>Place Order</button>
    </div>
  );
};

export default CheckoutPage;
