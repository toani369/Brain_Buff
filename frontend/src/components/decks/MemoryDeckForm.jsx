import React, { useState } from 'react';
import deckService from '../../services/deckService';

const MemoryDeckForm = ({ initialData, onSuccess, onCancel }) => {
  const [title, setTitle] = useState(initialData?.title || '');
  const [category, setCategory] = useState(initialData?.category || '');
  const [cardCount, setCardCount] = useState(
    initialData?.cardCount !== undefined ? initialData.cardCount : 0
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  const isEditMode = !!initialData?.id;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    setError(null);
    setSuccessMessage('');
    setLoading(true);

    const deckData = {
      title,
      category,
      cardCount: Number(cardCount) || 0
    };

    try {
      if (isEditMode) {
        await deckService.update(initialData.id, deckData);
        setSuccessMessage('Memory Deck updated successfully.');
        if (onSuccess) onSuccess();
      } else {
        await deckService.create(deckData);
        setSuccessMessage('MemoryDeck created successfully.');
        if (onSuccess) onSuccess();
      }
    } catch (err) {
      const msg =
        (err.response && err.response.data && (err.response.data.message || err.response.data.error || err.response.data)) ||
        err.message ||
        'Internal Server Error';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ width: '100%' }}>
      <h2
        style={{
          fontSize: '1.25rem',
          fontWeight: 700,
          color: '#0f172a',
          marginBottom: '1.25rem'
        }}
      >
        {isEditMode ? 'Edit Memory Deck' : 'Create New Memory Deck'}
      </h2>

      {error && (
        <div
          role="alert"
          style={{
            backgroundColor: '#fef2f2',
            border: '1px solid #fecaca',
            color: '#dc2626',
            borderRadius: '8px',
            padding: '0.75rem 1rem',
            marginBottom: '1.25rem',
            fontSize: '0.875rem',
            fontWeight: 500
          }}
        >
          {error}
        </div>
      )}

      {successMessage && (
        <div
          role="status"
          style={{
            backgroundColor: '#f0fdf4',
            border: '1px solid #bbf7d0',
            color: '#16a34a',
            borderRadius: '8px',
            padding: '0.75rem 1rem',
            marginBottom: '1.25rem',
            fontSize: '0.875rem',
            fontWeight: 500
          }}
        >
          {successMessage}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="deck-title" className="form-label">
            Deck Title
          </label>
          <input
            id="deck-title"
            name="title"
            type="text"
            className="form-control"
            placeholder="e.g. History Milestones"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="deck-category" className="form-label">
            Category
          </label>
          <input
            id="deck-category"
            name="category"
            type="text"
            className="form-control"
            placeholder="e.g. Academic, Personal, Language"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="deck-card-count" className="form-label">
            Initial Card Count
          </label>
          <input
            id="deck-card-count"
            name="cardCount"
            type="number"
            min="0"
            className="form-control"
            value={cardCount}
            onChange={(e) => setCardCount(e.target.value)}
          />
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            gap: '0.75rem',
            marginTop: '1.5rem'
          }}
        >
          {onCancel && (
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onCancel}
              disabled={loading}
            >
              Cancel
            </button>
          )}
          <button
            type="submit"
            className="btn btn-primary"
            disabled={loading}
          >
            {loading ? 'Initializing...' : 'Initialize Deck'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default MemoryDeckForm;
