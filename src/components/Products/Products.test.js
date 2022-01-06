import React from "react";
import "@testing-library/jest-dom";
import { screen, render } from "@testing-library/react";
import { Products } from "..";

const products = [
  {
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
  },
];

const productId = "1";
const qty = 1;

describe("Products testing", () => {
  test("Renders correct amount of childs", () => {
    const { container } = render(
      <Products products={products} onAddToCart={(productId, qty) => {}} />
    );
    expect(container.getElementsByClassName("MuiGrid-item").length).toBe(1);
  });
});
