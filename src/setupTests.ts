import '@testing-library/jest-dom';
import { vi } from 'vitest';
import { expect, afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import matchers from '@testing-library/jest-dom/matchers';

expect.extend(matchers);


afterEach(() => {
  cleanup();
});

(window).BASKET = {
  API: {
    getAll: vi.fn(),
    add: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
  },
};

