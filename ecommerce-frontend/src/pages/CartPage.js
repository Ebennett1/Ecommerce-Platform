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

  console.log("Cart Items:", items);  // Debug log

  return (
    <div>
      <h1>Your Cart</h1>
      {totalQuantity === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <ul>
          {items.map(item => (
            <li key={item.id}>
              {item.product.name} - Quantity: {item.quantity} <br/>
              {item.product.image && (
                <img src={item.product.image} alt={item.product.name} className="product-image"/>
              )}
              ${item.product.price}
              <button className='add-quanity-button' onClick={() => updateCartItem(item.id, item.quantity + 1)}>+</button>
              <button className='sub-quanity-button' onClick={() => updateCartItem(item.id, item.quantity - 1)}>-</button>
              <br></br>
              <button className='remove-item-button' onClick={() => removeCartItem(item.id)}>Remove</button>
            </li>
          ))}
        </ul>
      )}
      <button className="back-button" onClick={() => navigate('/products')}>Back to Products</button>
      <button className="checkout-button" onClick={() => navigate('/checkout')}>Go to Checkout</button>
    </div>
  );
};

export default CartPage;
