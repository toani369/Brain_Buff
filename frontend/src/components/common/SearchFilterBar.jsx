import React from 'react';

const SearchFilterBar = ({
  searchTerm = '',
  onSearchChange,
  category = 'ALL',
  onCategoryChange,
  categories = [],
  categoryLabel = 'Category',
  onClear
}) => {
  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '0.75rem',
        alignItems: 'center',
        margin: '1rem 0 1.5rem 0',
        padding: '0.875rem 1rem',
        backgroundColor: '#ffffff',
        borderRadius: '10px',
        border: '1px solid #e2e8f0',
        boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)'
      }}
    >
      <div style={{ flex: '1 1 240px', position: 'relative' }}>
        <input
          type="text"
          className="form-control"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          aria-label="Search"
          style={{ paddingLeft: '2.25rem' }}
        />
        <span
          style={{
            position: 'absolute',
            left: '0.75rem',
            top: '50%',
            transform: 'translateY(-50%)',
            color: '#94a3b8',
            pointerEvents: 'none'
          }}
        >
          🔍
        </span>
      </div>

      {categories.length > 0 && (
        <div style={{ flex: '0 1 200px' }}>
          <select
            className="form-control"
            value={category}
            onChange={(e) => onCategoryChange(e.target.value)}
            aria-label={categoryLabel}
          >
            <option value="ALL">All {categoryLabel}s</option>
            {categories.map((cat) => (
              <option key={cat.value || cat} value={cat.value || cat}>
                {cat.label || cat}
              </option>
            ))}
          </select>
        </div>
      )}

      {(searchTerm || (category && category !== 'ALL')) && onClear && (
        <button
          type="button"
          className="btn btn-secondary btn-sm"
          onClick={onClear}
        >
          Clear Filters
        </button>
      )}
    </div>
  );
};

export default SearchFilterBar;
