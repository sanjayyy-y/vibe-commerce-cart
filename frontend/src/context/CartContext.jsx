import { useState, useEffect } from 'react';
import {
  fetchCart,
  addItemToCartApi,
  removeItemFromCartApi,
} from '../api/apiService';
import { CartContext } from './cartTypes';


// 2. Create a "Provider" component
const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  // Function to load/refresh the cart from the backend
  const loadCart = async () => {
    try {
      setLoading(true);
      const data = await fetchCart();
      setCartItems(data.cartItems);
      setTotal(data.total);
    } catch (error) {
      console.error('Failed to load cart:', error);
    } finally {
      setLoading(false);
    }
  };

  // Load the cart when the provider first mounts
  useEffect(() => {
    loadCart();
  }, []);

  // Function to add an item
  const addToCart = async (productId, quantity = 1) => {
    try {
      await addItemToCartApi(productId, quantity);
      await loadCart(); // Refresh the cart from the DB
    } catch (error) {
      console.error('Failed to add to cart:', error);
    }
  };

  // Function to remove an item
  const removeFromCart = async (cartItemId) => {
    try {
      await removeItemFromCartApi(cartItemId);
      await loadCart(); // Refresh the cart from the DB
    } catch (error) {
      console.error('Failed to remove from cart:', error);
    }
  };

  // The "value" is what all consuming components will get
  const value = {
    cartItems,
    total,
    addToCart,
    removeFromCart,
    loadCart, // We export this in case we need to refresh
    loading,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export default CartProvider;
