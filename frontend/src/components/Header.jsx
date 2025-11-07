import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/cartTypes';
import './Header.css';

const Header = () => {
  const { cartItems } = useContext(CartContext);
  const itemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <header className="header">
      <div className="container header-content">
        <Link to="/" className="logo">
          E Commerce
        </Link>
        <nav>
          <Link to="/cart" className="cart-link">
            🛒 Cart {itemCount > 0 && <span className="cart-badge">{itemCount}</span>}
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;