import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import App from "../../App";
import { describe, it, expect, beforeEach, vi } from "vitest";

describe("App", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("shows loading state initially", () => {
    window.BASKET.API.getAll = vi.fn().mockResolvedValueOnce([]);
    render(<App />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("displays fruits after loading", async () => {
    const fruits = ["Apple", "Banana"];
    window.BASKET.API.getAll = vi.fn().mockResolvedValueOnce(fruits);

    render(<App />);

    await waitFor(() => {
      fruits.forEach((fruit) => {
        expect(screen.getByText(fruit)).toBeInTheDocument();
      });
    });
  });

  it("handles API errors", async () => {
    window.BASKET.API.getAll = vi.fn().mockRejectedValueOnce(new Error("API Error"));

    render(<App />);

    await waitFor(() => {
      expect(screen.getByText("Failed to fetch fruits")).toBeInTheDocument();
    });
  });

  it("renders AddFruit component", async () => {
    window.BASKET.API.getAll = vi.fn().mockResolvedValueOnce([]);
    render(<App />);

    await waitFor(() => {
      expect(screen.getByText("Add")).toBeInTheDocument();
    });
  });

  it("renders FruitList component with correct fruits", async () => {
    const fruits = ["Apple", "Banana"];
    window.BASKET.API.getAll = vi.fn().mockResolvedValueOnce(fruits);

    render(<App />);

    await waitFor(() => {
      fruits.forEach((fruit) => {
        expect(screen.getByText(fruit)).toBeInTheDocument();
      });
    });
  });

  it("displays error message when there is an error", async () => {
    window.BASKET.API.getAll = vi.fn().mockRejectedValueOnce(new Error("API Error"));

    render(<App />);

    await waitFor(() => {
      expect(screen.getByText("Failed to fetch fruits")).toBeInTheDocument();
    });
  });

  it("renders LoadingSpinner component when loading", () => {
    window.BASKET.API.getAll = vi.fn().mockResolvedValueOnce([]);
    render(<App />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });
});
