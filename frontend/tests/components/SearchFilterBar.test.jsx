import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import SearchFilterBar from '../../src/components/common/SearchFilterBar';

describe('SearchFilterBar Component', () => {
  test('renders with exact placeholder Search...', () => {
    const handleSearch = jest.fn();
    render(
      <SearchFilterBar
        searchTerm=""
        onSearchChange={handleSearch}
        categories={[{ value: 'MEMORY', label: 'Memory' }]}
      />
    );
    expect(screen.getByPlaceholderText('Search...')).toBeInTheDocument();
  });

  test('calls onSearchChange when typed in', () => {
    const handleSearch = jest.fn();
    render(
      <SearchFilterBar
        searchTerm=""
        onSearchChange={handleSearch}
      />
    );
    const input = screen.getByPlaceholderText('Search...');
    fireEvent.change(input, { target: { value: 'Dual-N-Back' } });
    expect(handleSearch).toHaveBeenCalledWith('Dual-N-Back');
  });
});
