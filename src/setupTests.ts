import "@testing-library/jest-dom";
import { vi } from "vitest";

window.BASKET = {
  API: {
    getAll: vi.fn(),
    add: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
  },
};
