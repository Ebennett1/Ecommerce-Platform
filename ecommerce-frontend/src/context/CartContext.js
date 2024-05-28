import React, { createContext, useState, useEffect, useCallback } from 'react';
import axios from '../api/axios';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({ items: [] });

  const fetchCart = useCallback(async () => {
    try {
      const response = await axios.get('/cart/');
      setCart(response.data);
    } catch (error) {
      console.error('Failed to fetch cart', error);
      setCart({ items: [] });  // Ensure cart is always an object with an items array
    }
  }, []);

  const addToCart = useCallback(async (productId, quantity) => {
    try {
      const response = await axios.post('/cart/add/', { product_id: productId, quantity });
      setCart(response.data);
    } catch (error) {
      console.error('Failed to add to cart', error);
      fetchCart();
    }
  }, [fetchCart]);

  const updateCartItem = useCallback(async (itemId, quantity) => {
    try {
      console.log(`Updating cart item ${itemId} with quantity ${quantity}`);
      const token = JSON.parse(localStorage.getItem('authTokens')).access;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };
      console.log(`PUT /cart/update/${itemId}/`, { quantity }, config);
      const response = await axios.put(`/cart/update/${itemId}/`, { quantity }, config);
      console.log('Update response:', response.data);
      fetchCart(); // Re-fetch the cart to get the updated state
    } catch (error) {
      console.error('Failed to update cart item', error);
    }
  }, [fetchCart]);
  

  const removeCartItem = useCallback(async (itemId) => {
    try {
      const token = JSON.parse(localStorage.getItem('authTokens')).access;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };
      const response = await axios.delete(`/cart/update/${itemId}/`, config);
      fetchCart();
      setCart(response.data);
    } catch (error) {
      console.error('Failed to remove cart item', error);
    }
  }, [fetchCart]);

  return (
    <CartContext.Provider value={{ cart, fetchCart, addToCart, updateCartItem, removeCartItem }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
