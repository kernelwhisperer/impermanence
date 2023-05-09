import { render, screen } from "@testing-library/react";
import React from "react";
import { expect, test } from "vitest";

import { App } from "./App";

test("renders", () => {
  render(<App />);
  const linkElement = screen.getByText(/Set as wallpaper/i);
  expect(linkElement).toBeInTheDocument();
});
