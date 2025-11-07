import { useState, useEffect } from 'react';
import { fetchProducts } from '../api/apiService';
import ProductGrid from '../components/ProductGrid';

const ShopPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Define an async function inside useEffect
    const getProducts = async () => {
      try {
        setLoading(true);
        const data = await fetchProducts();
        setProducts(data);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getProducts(); // Call the function
  }, []); // Empty array means this runs once on mount

  return (
    <div>
      <h2>Products</h2>
      {loading && <p>Loading products...</p>}
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      
      {!loading && !error && <ProductGrid products={products} />}
    </div>
  );
};

export default ShopPage;