import { render, screen } from "@testing-library/react";
import React from "react";

function FurniturePanel() {
  return <div>Furniture Panel</div>;
}

test("renders furniture panel", () => {
  render(<FurniturePanel />);
  const element = screen.getByText(/furniture panel/i);
  expect(element).toBeTruthy();
});