import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CartContext from '../context/CartContext';

const CartPage = () => {
  const { cart, fetchCart, updateCartItem, removeCartItem } = useContext(CartContext);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  // Ensure cart and cart.items are defined and are arrays
  const items = cart?.items || [];

  // Calculate the total quantity of items in the cart
  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0).toFixed(2);

  console.log("Cart Items:", items);  // Debug log

  return (
    <div className="cart-page">
      <h1>Shopping Cart</h1>
      <div className="cart-summary">
        <h2>Subtotal: ${totalPrice}</h2>
        <button className="checkout-button" onClick={() => navigate('/checkout')}>Go to Checkout</button>
      </div>
      {totalQuantity === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <ul className="cart-items">
          {items.map(item => (
            <li key={item.id} className="cart-item">
              {item.product.image && (
                <img src={item.product.image} alt={item.product.name} className="product-image"/>
              )}
              <div className="item-details">
                <h3>{item.product.name}</h3>
                <p>${item.product.price}</p>
                <div className="quantity-controls">
                  <button className="sub-quanity-button" onClick={() => updateCartItem(item.id, item.quantity - 1)}>-</button>
                  <span>{item.quantity}</span>
                  <button className="add-quanity-button" onClick={() => updateCartItem(item.id, item.quantity + 1)}>+</button>
                </div>
                <button className="remove-item-button" onClick={() => removeCartItem(item.id)}>Remove</button>
              </div>
            </li>
          ))}
        </ul>
      )}
      <button className="back-button" onClick={() => navigate('/products')}>Back to Products</button>
    </div>
  );
};

export default CartPage;
