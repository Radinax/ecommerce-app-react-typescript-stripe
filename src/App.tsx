import React, { useState, useEffect } from "react";
import { commerce } from "./lib/commerce";
import { Products, Navbar } from "./components";
import { IProducts, ICart } from "./types";

const initialCartValues = {
  currency: {
    code: "",
    symbol: "",
  },
  id: "",
  line_items: "",
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
    const item = await commerce.cart.add(productId, quantity);

    setCart(item.cart);
  };

  useEffect(() => {
    fetchProducts();
    fetchCart();
  }, []);

  return (
    <div>
      <Navbar totalItems={cart.total_items} />
      <Products products={products} onAddToCart={handleAddToCart} />
    </div>
  );
};

export default App;
