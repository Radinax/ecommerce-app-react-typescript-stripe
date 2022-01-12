import React, { useState, useEffect } from "react";
import { commerce } from "./lib/commerce";
import { Products, Navbar, Cart, Checkout } from "./components";
import {
  IProducts,
  ICart,
  ICheckoutCapture,
  ICheckoutCaptureResponse,
  IError,
} from "./types";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App: React.FC = () => {
  const [products, setProducts] = useState<IProducts[]>([]);
  const [cart, setCart] = useState<ICart | null>(null);
  const [order, setOrder] = useState<ICheckoutCaptureResponse | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const fetchProducts = async () => {
    const { data } = await commerce.products.list();
    setProducts(data);
  };

  const fetchCart = async () => {
    setCart(await commerce.cart.retrieve());
  };

  const handleAddToCart = async (productId: string, quantity: number) => {
    try {
      const { cart } = await commerce.cart.add(productId, quantity);
      setCart(cart);
    } catch (e) {
      console.log(e);
    }
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

  const refreshCart = async () => {
    const newCart = await commerce.cart.refresh();

    setCart(newCart);
  };

  const handleCaptureCheckout = async (
    checkoutTokenId: string,
    newOrder: ICheckoutCapture
  ) => {
    try {
      const incomingOrder = await commerce.checkout.capture(
        checkoutTokenId,
        newOrder as ICheckoutCapture
      );

      setOrder(incomingOrder);
      refreshCart();
    } catch (e) {
      const error = e as IError;
      setErrorMessage(error.data.error.message);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCart();
  }, []);

  if (products.length === 0 || cart === null) return <div>Loading...</div>;

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

          <Route
            path="/checkout"
            element={
              <Checkout
                cart={cart}
                order={order}
                onCaptureCheckout={handleCaptureCheckout}
                error={errorMessage}
              />
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
