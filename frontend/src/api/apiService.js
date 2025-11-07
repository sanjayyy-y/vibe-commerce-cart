export const fetchProducts = async () => {
  const res = await fetch('/api/products');
  if (!res.ok) {
    throw new Error('Failed to fetch products');
  }
  return res.json();
};

export const fetchCart = async () => {
  const res = await fetch('/api/cart');
  if (!res.ok) {
    throw new Error('Failed to fetch cart');
  }
  return res.json(); // Will return { cartItems: [], total: 0 }
};

export const addItemToCartApi = async (productId, quantity) => {
  const res = await fetch('/api/cart', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ productId, quantity }),
  });
  if (!res.ok) {
    throw new Error('Failed to add item to cart');
  }
  return res.json();
};

export const removeItemFromCartApi = async (cartItemId) => {
  const res = await fetch(`/api/cart/${cartItemId}`, {
    method: 'DELETE',
  });
  if (!res.ok) {
    throw new Error('Failed to remove item from cart');
  }
  return res.json();
};

export const processCheckoutApi = async (customerInfo) => {
  const res = await fetch('/api/checkout', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(customerInfo), // { name, email }
  });

  if (!res.ok) {
    throw new Error('Checkout failed');
  }
  return res.json(); // Returns the receipt
};