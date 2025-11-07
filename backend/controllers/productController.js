import Product from '../models/productModel.js';

// Mock data to seed the database
const mockProducts = [
    {   
        name: 'Anime T-Shirt',
        price: 24.99,
        image: '/images/t-shirt.jpg', 
    },
    {   
        name: 'Unisex Hoodie', 
        price: 49.99,
        image: '/images/unisex-hoodie.webp',
    },
    {   
        name: 'Cap', 
        price: 19.99,
        image: '/images/cap.webp',
    },
    {   
        name: 'Vibe Sneakers', 
        price: 89.99,
        image: '/images/sneaker.webp',
    },
    {   
        name: 'Transparent Water Bottle', 
        price: 14.99,
        image: '/images/water-bottle.jpg',
    },
];

// Controller function for GET /api/products
export const getProducts = async (req, res) => {
  try {
    // Check if there are any products in the database
    const count = await Product.countDocuments();

    // If the 'products' collection is empty, insert the mock data
    if (count === 0) {
      console.log('No products found, seeding database...');
      await Product.insertMany(mockProducts);
    }

    // Fetch all products from the database
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};