import CartItem from '../models/cartItemModel.js';

/**
 * @desc    Get all cart items
 * @route   GET /api/cart
 */
export const getCartItems = async (req, res) => {
  try {
    // Find all cart items and 'populate' the 'product' field
    // This replaces the productId with the actual product document
    const cartItems = await CartItem.find({}).populate('product');

    // Calculate the total price
    const total = cartItems.reduce((acc, item) => {
      // Ensure product exists and has a price before adding
      if (item.product && item.product.price) {
        return acc + item.product.price * item.quantity;
      }
      return acc;
    }, 0);

    res.json({ cartItems, total: parseFloat(total.toFixed(2)) });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

/**
 * @desc    Add an item to the cart
 * @route   POST /api/cart
 */
export const addItemToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    // Check if this item is already in the cart
    const existingItem = await CartItem.findOne({ product: productId });

    if (existingItem) {
      // If it exists, update the quantity
      existingItem.quantity += quantity;
      const updatedItem = await existingItem.save();
      res.status(200).json(updatedItem);
    } else {
      // If it's a new item, create it
      const newItem = new CartItem({
        product: productId,
        quantity: quantity,
      });
      const savedItem = await newItem.save();
      res.status(201).json(savedItem);
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

/**
 * @desc    Remove an item from the cart
 * @route   DELETE /api/cart/:id
 */
export const removeItemFromCart = async (req, res) => {
  try {
    const cartItem = await CartItem.findById(req.params.id);

    if (cartItem) {
      await cartItem.deleteOne(); // Use deleteOne() on the document
      res.json({ message: 'Item removed from cart' });
    } else {
      res.status(404).json({ message: 'Cart item not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};