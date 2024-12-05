import React from 'react';
import { render, screen } from '@testing-library/react';
import FruitList from '../FruitList';
import { vi } from 'vitest';

describe('FruitList', () => {
  const fruits = ['Apple', 'Banana', 'Orange'];
  const onUpdate = vi.fn();
  const onDelete = vi.fn();

  it('renders all fruits', () => {
    render(<FruitList fruits={fruits} onUpdate={onUpdate} onDelete={onDelete} />);
    
    fruits.forEach(fruit => {
      expect(screen.getByText(fruit)).toBeInTheDocument();
    });
  });

  it('renders empty list', () => {
    render(<FruitList fruits={[]} onUpdate={onUpdate} onDelete={onDelete} />);
    expect(screen.queryByRole('listitem')).not.toBeInTheDocument();
  });
});

