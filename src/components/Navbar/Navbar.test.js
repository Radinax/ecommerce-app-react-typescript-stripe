import React from "react";
import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom";
import { screen, render, waitFor } from "@testing-library/react";
import Navbar from "./Navbar";

const renderWithRouter = (ui, { route = "/" } = {}) => {
  window.history.pushState({}, "Test page", route);

  return render(ui, { wrapper: BrowserRouter });
};

describe("Navbar", () => {
  it("renders", () => {
    renderWithRouter(<Navbar totalItems={4} />);
    expect(screen.getByText("Commerce.js")).toBeInTheDocument();
  });

  it("shows correct amount of items", () => {
    const { container } = renderWithRouter(<Navbar totalItems={4} />);
    expect(
      container.getElementsByClassName("MuiBadge-badge")[0]
    ).toHaveTextContent(4);
  });
});
