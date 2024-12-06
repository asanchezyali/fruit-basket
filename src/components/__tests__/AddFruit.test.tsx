import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AddFruit from "../AddFruit";
import { describe, it, expect, beforeEach, vi } from "vitest";
import { FruitProvider, useFruit } from "../../context/FruitContext";

vi.mock("../../context/FruitContext", () => ({
  useFruit: vi.fn(),
  FruitProvider: ({ children } : { children: React.ReactNode }) => <div>{children}</div>,
}));

describe("AddFruit", () => {
  const addFruit = vi.fn();

  beforeEach(() => {
    vi.resetAllMocks();
    (useFruit as jest.Mock).mockReturnValue({ addFruit });
  });

  const renderWithProvider = (ui: React.ReactElement) => {
    return render(<FruitProvider>{ui}</FruitProvider>);
  };

  it("renders input and button", () => {
    renderWithProvider(<AddFruit />);
    expect(screen.getByPlaceholderText("Enter fruit name")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /add/i })).toBeInTheDocument();
  });

  it("handles successful submission", async () => {
    renderWithProvider(<AddFruit />);

    const input = screen.getByPlaceholderText("Enter fruit name");
    await userEvent.type(input, "Mango");
    await userEvent.click(screen.getByRole("button", { name: /add/i }));

    expect(addFruit).toHaveBeenCalledWith("Mango");
    await waitFor(() => {
      expect(input).toHaveValue("");
    });
  });

  it("handles submission error", async () => {
    const error = new Error("Test error");
    addFruit.mockRejectedValueOnce(error);

    renderWithProvider(<AddFruit />);

    await userEvent.type(screen.getByPlaceholderText("Enter fruit name"), "Mango");
    await userEvent.click(screen.getByRole("button", { name: /add/i }));

    await waitFor(() => {
      expect(screen.getByText(error.message)).toBeInTheDocument();
    });
  });

  it("handles duplicate fruit submission", async () => {
    const error = new Error('"Mango" already in use');
    addFruit.mockRejectedValueOnce(error);

    renderWithProvider(<AddFruit />);

    await userEvent.type(screen.getByPlaceholderText("Enter fruit name"), "Mango");
    await userEvent.click(screen.getByRole("button", { name: /add/i }));

    await waitFor(() => {
      expect(screen.getByText(error.message)).toBeInTheDocument();
    });
  });
});
