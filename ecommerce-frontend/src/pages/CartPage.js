import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CartContext from '../context/CartContext';

const CartPage = () => {
  const { cart, fetchCart, updateCartItem, removeCartItem } = useContext(CartContext);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const items = cart?.items || [];
  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0).toFixed(2);

  return (
    <div className="container is-fluid">
      <h1 className="title">Shopping Cart</h1>
      <div className="box">
        <h2 className="subtitle">Subtotal: ${totalPrice}</h2>
        <button className="button is-primary" onClick={() => navigate('/checkout')}>Go to Checkout</button>
      </div>
      {totalQuantity === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <ul className="box">
          {items.map(item => (
            <li key={item.id} className="media mb-4">
              {item.product.image && (
                <figure className="media-left">
                  <p className="image is-128x128">
                    <img src={item.product.image} alt={item.product.name} />
                  </p>
                </figure>
              )}
              <div className="media-content">
                <div className="content">
                  <h3 className="title is-5">{item.product.name}</h3>
                  <p className="subtitle is-6">${item.product.price}</p>
                  <div className="field has-addons">
                    <p className="control">
                      <button className="button is-small" onClick={() => updateCartItem(item.id, item.quantity - 1)}>-</button>
                    </p>
                    <p className="control">
                      <span className="button is-static">{item.quantity}</span>
                    </p>
                    <p className="control">
                      <button className="button is-small" onClick={() => updateCartItem(item.id, item.quantity + 1)}>+</button>
                    </p>
                  </div>
                  <button className="button is-danger is-small" onClick={() => removeCartItem(item.id)}>Remove</button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
      <button className="button is-link mt-4" onClick={() => navigate('/products')}>Back to Products</button>
    </div>
  );
};

export default CartPage;
