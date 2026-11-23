import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import MemoryDeckForm from '../../src/components/decks/MemoryDeckForm';

describe('MemoryDeckForm Component', () => {
  test('renders create heading and exact button label Initialize Deck', () => {
    render(<MemoryDeckForm />);
    expect(screen.getByText('Create New Memory Deck')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Initialize Deck/i })).toBeInTheDocument();
  });

  test('contains text category input and exact placeholder', () => {
    render(<MemoryDeckForm />);
    const catInput = screen.getByPlaceholderText('e.g. Academic, Personal, Language');
    expect(catInput).toBeInTheDocument();
    expect(catInput.tagName).toBe('INPUT');
  });

  test('initial card count defaults to 0', () => {
    render(<MemoryDeckForm />);
    const cardInput = screen.getByDisplayValue('0');
    expect(cardInput).toBeInTheDocument();
  });
});
