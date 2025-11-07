import mongoose from 'mongoose';

const cartItemSchema = new mongoose.Schema({
  // This 'ref' tells Mongoose to link this ID to the 'Product' model
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product', 
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1, // Must have at least 1
    default: 1,
  },
});

const CartItem = mongoose.model('CartItem', cartItemSchema);

export default CartItem;