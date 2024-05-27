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
      const response = await axios.put(`/cart/update/${itemId}/`, { quantity });
      console.log('Update response:', response.data);
      setCart(response.data);
    } catch (error) {
      console.error('Failed to update cart item', error);
    }
  }, []);
  

  const removeCartItem = useCallback(async (itemId) => {
    try {
      const response = await axios.delete(`/cart/update/${itemId}/`);
      setCart(response.data);
    } catch (error) {
      console.error('Failed to remove cart item', error);
      fetchCart();  // Refetch the cart to ensure consistency
    }
  }, [fetchCart]);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  return (
    <CartContext.Provider value={{ cart, fetchCart, addToCart, updateCartItem, removeCartItem }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
