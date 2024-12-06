import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect, beforeEach, vi } from "vitest";
import FruitList from "../FruitList";
import { FruitProvider, useFruit } from "../../context/FruitContext";

vi.mock("../../context/FruitContext", () => ({
  useFruit: vi.fn(),
  FruitProvider: ({ children } : { children: React.ReactNode }) => <div>{children}</div>,
}));

describe("FruitList", () => {
  const fruits = ["Apple", "Banana", "Orange"];

  beforeEach(() => {
    vi.resetAllMocks();
    (useFruit as jest.Mock).mockReturnValue({ fruits });
  });

  const renderWithProvider = (ui: React.ReactElement) => {
    return render(<FruitProvider>{ui}</FruitProvider>);
  };

  it("renders all fruits", () => {
    renderWithProvider(<FruitList />);

    fruits.forEach((fruit) => {
      expect(screen.getByText(fruit)).toBeInTheDocument();
    });
  });

  it("renders empty list", () => {
    (useFruit as jest.Mock).mockReturnValue({ fruits: [] });
    renderWithProvider(<FruitList />);

    expect(screen.queryByText("Apple")).not.toBeInTheDocument();
    expect(screen.queryByText("Banana")).not.toBeInTheDocument();
    expect(screen.queryByText("Orange")).not.toBeInTheDocument();
  });
});