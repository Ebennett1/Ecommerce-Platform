import React, { createContext, useState, useEffect, useCallback } from 'react';
import axios from '../api/axios';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({ items: [] });

  // Function to fetch the cart from the server
  const fetchCart = useCallback(async () => {
    try {
      const token = JSON.parse(localStorage.getItem('authTokens')).access;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };
      const response = await axios.get('/cart/', config);
      setCart(response.data);
    } catch (error) {
      console.error('Failed to fetch cart', error);
      setCart({ items: [] });
    }
  }, []);

  // Fetch the cart when the component mounts or fetchCart changes
  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  // Function to add an item to the cart
  const addToCart = useCallback(async (productId, quantity) => {
    try {
      const token = JSON.parse(localStorage.getItem('authTokens')).access;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };
      await axios.post('/cart/add/', { product_id: productId, quantity }, config);
      fetchCart();  // Refresh the cart after adding an item
    } catch (error) {
      console.error('Failed to add to cart', error);
    }
  }, [fetchCart]);

  // Function to update an item in the cart
  const updateCartItem = useCallback(async (itemId, quantity) => {
    try {
      const token = JSON.parse(localStorage.getItem('authTokens')).access;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };
      await axios.put(`/cart/update/${itemId}/`, { quantity }, config);
      fetchCart();  // Refresh the cart after updating an item
    } catch (error) {
      console.error('Failed to update cart item', error);
    }
  }, [fetchCart]);

  // Function to remove an item from the cart
  const removeCartItem = useCallback(async (itemId) => {
    try {
      const token = JSON.parse(localStorage.getItem('authTokens')).access;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };
      await axios.delete(`/cart/update/${itemId}/`, config);
      fetchCart();  // Refresh the cart after removing an item
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
