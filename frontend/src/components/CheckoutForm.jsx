import { useState, useContext } from 'react';
import { CartContext } from '../context/cartTypes';
import { processCheckoutApi } from '../api/apiService';
import './CheckoutForm.css'; // We'll create this next

const CheckoutForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [receipt, setReceipt] = useState(null);
  const [error, setError] = useState(null);

  // Get cart info and the loadCart function to refresh it
  const { cartItems, total, loadCart } = useContext(CartContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (cartItems.length === 0) {
      setError('Your cart is empty. Add items to check out.');
      return;
    }

    try {
      const customerInfo = { name, email };
      const receiptData = await processCheckoutApi(customerInfo);
      setReceipt(receiptData); // Save the receipt
      setIsModalOpen(true); // Open the modal
      loadCart(); // Refresh the cart (it's now empty)
      setName(''); // Clear the form
      setEmail('');
    } catch (err) {
      setError(err.message);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setReceipt(null);
  };

  return (
    <div className="checkout-form-container">
      <h3>Checkout</h3>
      <form onSubmit={handleSubmit} className="checkout-form">
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        {error && <p className="checkout-error">{error}</p>}
        <button
          type="submit"
          className="checkout-btn"
          disabled={cartItems.length === 0}
        >
          Checkout (Total: ${total.toFixed(2)})
        </button>
      </form>

      {/* --- The Modal --- */}
      {isModalOpen && receipt && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Checkout Successful!</h2>
            <p>
              <strong>Receipt ID:</strong> {receipt.receiptId}
            </p>
            <p>
              <strong>Customer:</strong> {receipt.customerInfo.name}
            </p>
            <p>
              <strong>Total Paid:</strong> ${receipt.total.toFixed(2)}
            </p>
            <h4>Items Purchased:</h4>
            <ul>
              {receipt.items.map((item) => (
                <li key={item.name}>
                  {item.name} (Qty: {item.quantity})
                </li>
              ))}
            </ul>
            <button onClick={closeModal} className="modal-close-btn">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckoutForm;