import express from 'express';
import { processCheckout } from '../controllers/checkoutController.js';

const router = express.Router();

// Defines the route: POST /api/checkout
router.route('/').post(processCheckout);

export default router;