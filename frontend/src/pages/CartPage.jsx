import CartView from '../components/CartView';
import CheckoutForm from '../components/CheckoutForm';
import './CartPage.css';

const CartPage = () => {
  return (
    <div className="cart-page-layout">
      <div className="cart-view-container">
        <CartView />
      </div>
      <div className="checkout-form-container-wrapper">
        <CheckoutForm />
      </div>
    </div>
  );
};

export default CartPage;