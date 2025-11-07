import CartItem from '../models/cartItemModel.js';

/**
 * @desc    Process checkout and create a mock receipt
 * @route   POST /api/checkout
 */
export const processCheckout = async (req, res) => {
  try {
    const { name, email } = req.body;

    // Find all cart items and populate product details
    const cartItems = await CartItem.find({}).populate('product');

    // --- FIX IS HERE ---
    // Filter out any cart items where the associated product was deleted
    const validCartItems = cartItems.filter(item => item.product);

    if (validCartItems.length === 0) {
      // This check now handles both empty carts and carts with only deleted items
      return res.status(400).json({ message: 'Your cart is empty or contains invalid items.' });
    }

    // Calculate total ONLY from valid items
    const total = validCartItems.reduce((acc, item) => {
      return acc + item.product.price * item.quantity;
    }, 0);

    // Create a mock receipt ONLY from valid items
    const receipt = {
      receiptId: `VIBE-${Date.now()}`,
      timestamp: new Date().toISOString(),
      customerInfo: { name, email },
      items: validCartItems.map(item => ({
        name: item.product.name,
        quantity: item.quantity,
        price: item.product.price,
      })),
      total: parseFloat(total.toFixed(2)),
    };
    // --- END OF FIX ---

    // Clear the cart from the database
    await CartItem.deleteMany({});

    // Send the receipt back to the frontend
    res.status(200).json(receipt);

  } catch (error) {
    console.error('--- CHECKOUT FAILED ---', error); // Added a clear log
    res.status(500).json({ message: 'Server Error' });
  }
};