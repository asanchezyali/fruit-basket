import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AddFruit from "../AddFruit";
import { describe, it, expect, beforeEach, vi } from "vitest";

describe("AddFruit", () => {
  const onAdd = vi.fn();

  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("renders input and button", () => {
    render(<AddFruit onAdd={onAdd} />);
    expect(screen.getByPlaceholderText("Enter fruit name")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /add/i })).toBeInTheDocument();
  });

  it("handles successful submission", async () => {
    render(<AddFruit onAdd={onAdd} />);

    const input = screen.getByPlaceholderText("Enter fruit name");
    await userEvent.type(input, "Mango");
    await userEvent.click(screen.getByRole("button", { name: /add/i }));

    expect(onAdd).toHaveBeenCalledWith("Mango");
    await waitFor(() => {
      expect(input).toHaveValue("");
    });
  });

  it("handles submission error", async () => {
    const error = new Error("Test error");
    onAdd.mockRejectedValueOnce(error);

    render(<AddFruit onAdd={onAdd} />);

    await userEvent.type(screen.getByPlaceholderText("Enter fruit name"), "Mango");
    await userEvent.click(screen.getByRole("button", { name: /add/i }));

    await waitFor(() => {
      expect(screen.getByText(error.message)).toBeInTheDocument();
    });
  });

  it("handles duplicate fruit submission", async () => {
    const error = new Error('"Mango" already in use');
    onAdd.mockRejectedValueOnce(error);

    render(<AddFruit onAdd={onAdd} />);

    await userEvent.type(screen.getByPlaceholderText("Enter fruit name"), "Mango");
    await userEvent.click(screen.getByRole("button", { name: /add/i }));

    await waitFor(() => {
      expect(screen.getByText(error.message)).toBeInTheDocument();
    });
  });
});
