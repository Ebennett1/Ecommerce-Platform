import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import CartContext from '../context/CartContext';
import axios from '../api/axios';
import OrderConfirmationPage from './OrderConfirmationPage';

const stripePromise = loadStripe('pk_test_51PMLrxL6Ra3fxI3YhY4LGsFSF5VvDpT0fhe5Op37qurmfvX2zIWzqmbsdxyCGfWK8nsPULQU7fgtaLizwIyJItxJ00aJcerxJU');

const CheckoutPage = () => {
  const { cart, fetchCart } = useContext(CartContext);
  const navigate = useNavigate();
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);
  const [clientSecret, setClientSecret] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchInitialData = async () => {
      await fetchCart();
      if (cart.items.length === 0) {
        setIsLoading(false);
        return;
      }
      const token = JSON.parse(localStorage.getItem('authTokens')).access;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };
      try {
        const response = await axios.post('/create-payment-intent/', { total_price: cart.items.reduce((sum, item) => sum + item.product.price * item.quantity, 0) }, config);
        setClientSecret(response.data.clientSecret);
      } catch (error) {
        console.error('Error creating payment intent:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchInitialData();
  }, []); // Only run once

  const handleCheckout = async () => {
    // Move payment handling to the Stripe form
  };

  if (orderSuccess) {
    return <OrderConfirmationPage order={orderDetails} />;
  }

  if (isLoading) {
    return <div>Loading...</div>;
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
      {cart.items.length > 0 && (
        <Elements stripe={stripePromise}>
          <CheckoutForm clientSecret={clientSecret} setOrderSuccess={setOrderSuccess} setOrderDetails={setOrderDetails} />
        </Elements>
      )}
    </div>
  );
};

const CheckoutForm = ({ clientSecret, setOrderSuccess, setOrderDetails }) => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) return;

    const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: 'Your Name',
        },
      },
    });

    if (error) {
      console.error('Payment failed:', error);
    } else if (paymentIntent.status === 'succeeded') {
      const token = JSON.parse(localStorage.getItem('authTokens')).access;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };
      const response = await axios.post('/orders/create/', {}, config);
      setOrderDetails(response.data);
      setOrderSuccess(true);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button className='checkout-button' type="submit" disabled={!stripe}>Place Order</button>
    </form>
  );
};

export default CheckoutPage;
