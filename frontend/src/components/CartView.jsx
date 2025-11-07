import { useContext } from 'react';
import { CartContext } from '../context/cartTypes';
import './CartView.css'; // Import component-specific CSS

const CartView = () => {
  // Get all the values from our global cart state
  const { cartItems, total, removeFromCart, loading } = useContext(CartContext);

  if (loading) {
    return <div className="cart-view">Loading cart...</div>;
  }

  return (
    <aside className="cart-view">
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p className="cart-empty">Your cart is empty.</p>
      ) : (
        <>
          <div className="cart-items-list">
            {cartItems.map((item) => (
              <div key={item._id} className="cart-item">
                <div className="cart-item-info">
                  <span className="item-name">
                    {item.product?.name || 'Product not found'}
                  </span>
                  <span className="item-details">
                    Qty: {item.quantity} &times; $
                    {(item.product?.price || 0).toFixed(2)}
                  </span>
                </div>
                <button
                  className="remove-btn"
                  onClick={() => removeFromCart(item._id)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
          <div className="cart-total">
            <strong>Total:</strong>
            <span>${total.toFixed(2)}</span>
          </div>
        </>
      )}
    </aside>
  );
};

export default CartView;