import ProductCard from './ProductCard';
import './ProductGrid.css'; // Import component-specific CSS

const ProductGrid = ({ products }) => {
  return (
    <div className="product-grid">
      {products.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
};

export default ProductGrid;