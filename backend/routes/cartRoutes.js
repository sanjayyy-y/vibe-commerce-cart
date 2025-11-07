import express from 'express';
import {
  addItemToCart,
  getCartItems,
  removeItemFromCart,
} from '../controllers/cartController.js';

const router = express.Router();

// /api/cart
router.route('/')
  .get(getCartItems)
  .post(addItemToCart);

// /api/cart/:id
router.route('/:id')
  .delete(removeItemFromCart);

export default router;