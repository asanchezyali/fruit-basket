import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import FruitItem from "../FruitItem";
import { vi } from "vitest";
import { FruitProvider, useFruit } from "../../context/FruitContext";

vi.mock("../../context/FruitContext", () => ({
  useFruit: vi.fn(),
  FruitProvider: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

describe("FruitItem", () => {
  const updateFruit = vi.fn();
  const deleteFruit = vi.fn();
  const name = "Apple";

  beforeEach(() => {
    vi.resetAllMocks();
    (useFruit as jest.Mock).mockReturnValue({ updateFruit, deleteFruit });
  });

  const renderWithProvider = (ui: React.ReactElement) => {
    return render(<FruitProvider>{ui}</FruitProvider>);
  };

  it("renders fruit name and buttons", () => {
    renderWithProvider(<FruitItem name={name} />);
    expect(screen.getByText(name)).toBeInTheDocument();
    expect(screen.getByTitle("Edit")).toBeInTheDocument();
    expect(screen.getByTitle("Delete")).toBeInTheDocument();
  });

  it("handles edit mode", async () => {
    renderWithProvider(<FruitItem name={name} />);

    await userEvent.click(screen.getByTitle("Edit"));
    expect(screen.getByDisplayValue(name)).toBeInTheDocument();
    expect(screen.getByTitle("Save")).toBeInTheDocument();
    expect(screen.getByTitle("Cancel")).toBeInTheDocument();
  });

  it("handles successful update", async () => {
    renderWithProvider(<FruitItem name={name} />);

    await userEvent.click(screen.getByTitle("Edit"));
    await userEvent.type(screen.getByDisplayValue(name), " Updated");
    await userEvent.click(screen.getByTitle("Save"));

    expect(updateFruit).toHaveBeenCalledWith(name, "Apple Updated");
  });

  it("handles successful delete", async () => {
    renderWithProvider(<FruitItem name={name} />);

    await userEvent.click(screen.getByTitle("Delete"));
    expect(deleteFruit).toHaveBeenCalledWith(name);
  });
});
