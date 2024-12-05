import React from "react";
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FruitItem from '../FruitItem';
import { vi } from 'vitest';

describe('FruitItem', () => {
  const onUpdate = vi.fn();
  const onDelete = vi.fn();
  const name = 'Apple';

  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('renders fruit name and buttons', () => {
    render(<FruitItem name={name} onUpdate={onUpdate} onDelete={onDelete} />);
    expect(screen.getByText(name)).toBeInTheDocument();
    expect(screen.getByTitle('Edit')).toBeInTheDocument();
    expect(screen.getByTitle('Delete')).toBeInTheDocument();
  });

  it('handles edit mode', async () => {
    render(<FruitItem name={name} onUpdate={onUpdate} onDelete={onDelete} />);
    
    await userEvent.click(screen.getByTitle('Edit'));
    expect(screen.getByDisplayValue(name)).toBeInTheDocument();
    expect(screen.getByTitle('Save')).toBeInTheDocument();
    expect(screen.getByTitle('Cancel')).toBeInTheDocument();
  });

  it('handles successful update', async () => {
    render(<FruitItem name={name} onUpdate={onUpdate} onDelete={onDelete} />);
    
    await userEvent.click(screen.getByTitle('Edit'));
    await userEvent.type(screen.getByDisplayValue(name), ' Updated');
    await userEvent.click(screen.getByTitle('Save'));

    expect(onUpdate).toHaveBeenCalledWith(name, 'Apple Updated');
  });

  it('handles successful delete', async () => {
    render(<FruitItem name={name} onUpdate={onUpdate} onDelete={onDelete} />);
    
    await userEvent.click(screen.getByTitle('Delete'));
    expect(onDelete).toHaveBeenCalledWith(name);
  });
});

