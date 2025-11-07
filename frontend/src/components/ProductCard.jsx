import { useContext } from 'react';
import { CartContext } from '../context/cartTypes'; // 2. Import our context
import './ProductCard.css';

const ProductCard = ({ product }) => {
  // 3. Get the addToCart function from the context
  const { addToCart } = useContext(CartContext);

  const handleAddToCart = () => {
    
    addToCart(product._id);
  };

  return (
    <div className="product-card">
      <div className="product-image-container">
        <img src={product.image} alt={product.name} className="product-image" />
      </div>
      <h3 className="product-name">{product.name}</h3>
      <p className="product-price">${product.price.toFixed(2)}</p>
      <button className="add-to-cart-btn" onClick={handleAddToCart}>
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;