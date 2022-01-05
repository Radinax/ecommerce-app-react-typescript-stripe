import React, { useState, useEffect } from "react";
import { commerce } from "./lib/commerce";
import { Products, Navbar, Cart, Checkout } from "./components";
import { IProducts, ICart } from "./types";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const initialCartValues = {
  currency: {
    code: "",
    symbol: "",
  },
  id: "",
  line_items: [
    {
      id: "",
      name: "",
      image: {
        url: "",
      },
      line_total: {
        formatted: "",
        formatter_with_code: "",
        formatted_with_symbol: "",
      },
      quantity: 0,
    },
  ],
  subtotal: {
    formatted: "",
    formatter_with_code: "",
    formatted_with_symbol: "",
  },
  total_items: 0,
};

const App: React.FC = () => {
  const [products, setProducts] = useState<IProducts[]>([]);
  const [cart, setCart] = useState<ICart>(initialCartValues);

  const fetchProducts = async () => {
    const { data } = await commerce.products.list();
    setProducts(data);
  };

  const fetchCart = async () => {
    setCart(await commerce.cart.retrieve());
  };

  const handleAddToCart = async (productId: string, quantity: number) => {
    const { cart } = await commerce.cart.add(productId, quantity);

    setCart(cart);
  };

  const handleUpdateCartQty = async (productId: string, quantity: number) => {
    const { cart } = await commerce.cart.update(productId, { quantity });

    setCart(cart);
  };

  const handleRemoveFromCart = async (productId: string) => {
    const { cart } = await commerce.cart.remove(productId);

    setCart(cart);
  };

  const handleEmptyCart = async () => {
    const { cart } = await commerce.cart.empty();

    setCart(cart);
  };

  useEffect(() => {
    fetchProducts();
    fetchCart();
  }, []);

  if (products.length === 0) return <div>Loading...</div>;

  return (
    <Router>
      <div>
        <Navbar totalItems={cart.total_items} />
        <Routes>
          <Route
            path="/"
            element={
              <Products products={products} onAddToCart={handleAddToCart} />
            }
          />
          <Route
            path="/cart"
            element={
              <Cart
                cart={cart}
                handleUpdateCartQty={handleUpdateCartQty}
                handleRemoveFromCart={handleRemoveFromCart}
                handleEmptyCart={handleEmptyCart}
              />
            }
          />

          <Route path="/checkout" element={<Checkout cart={cart} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
