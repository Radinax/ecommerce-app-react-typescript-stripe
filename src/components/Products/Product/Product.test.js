import React from "react";
import "@testing-library/jest-dom";
import { screen, render } from "@testing-library/react";
import Product from "./Product";

const product = {
  id: "123",
  name: "product",
  description: "Description",
  price: {
    formatted: "50.00",
    formatter_with_code: "50.00 USD",
    formatted_with_symbol: "$50.00",
  },
  image: {
    url:
      "https://media.istockphoto.com/photos/big-and-small-picture-id172759822?b=1&k=20&m=172759822&s=170667a&w=0&h=kkmaR2OYuS14rTiEotbzXoBecwnRePNC79Jsgl3M4dY=",
  },
};

const productId = "1";
const qty = 1;

describe("Correct initial view", () => {
  beforeEach(() => {
    render(<Product product={product} onAddToCart={(productId, qty) => {}} />);
  });

  test("product name, description and price are present", () => {
    const productName = screen.getByText(product.name);
    const productDescription = screen.getByText(product.description);
    const productPrice = screen.getByText(product.price.formatted_with_symbol);
    expect(productName).toBeInTheDocument();
    expect(productDescription).toBeInTheDocument();
    expect(productPrice).toBeInTheDocument();
  });

  test("product image is shown", () => {
    const productName = screen.getByText(product.name);
    expect(productName).toHaveStyle(
      `background-color: url(${product.image.url})`
    );
  });
});
