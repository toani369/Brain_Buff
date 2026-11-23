import React, { useState } from 'react';
import exerciseService from '../../services/exerciseService';

const ExerciseForm = ({ initialData, onSuccess, onCancel }) => {
  const [title, setTitle] = useState(initialData?.title || '');
  const [description, setDescription] = useState(initialData?.description || '');
  const [exerciseType, setExerciseType] = useState(initialData?.exerciseType || 'MEMORY');
  const [difficultyLevel, setDifficultyLevel] = useState(initialData?.difficultyLevel || 1);
  const [instructions, setInstructions] = useState(initialData?.instructions || '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const isEdit = !!initialData?.id;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const payload = {
      title,
      description,
      exerciseType,
      difficultyLevel: Number(difficultyLevel),
      instructions
    };

    try {
      if (isEdit) {
        await exerciseService.update(initialData.id, payload);
      } else {
        await exerciseService.create(payload);
      }
      if (onSuccess) onSuccess();
    } catch (err) {
      const msg =
        (err.response && err.response.data && (err.response.data.message || err.response.data)) ||
        err.message ||
        'Failed to save exercise';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && (
        <div
          role="alert"
          style={{
            backgroundColor: '#fef2f2',
            border: '1px solid #fecaca',
            color: '#dc2626',
            borderRadius: '8px',
            padding: '0.75rem 1rem',
            marginBottom: '1rem',
            fontSize: '0.875rem'
          }}
        >
          {error}
        </div>
      )}

      <div className="form-group">
        <label htmlFor="ex-title" className="form-label">Exercise Title</label>
        <input
          id="ex-title"
          type="text"
          className="form-control"
          placeholder="e.g. Dual-N-Back Working Memory"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        <div className="form-group">
          <label htmlFor="ex-type" className="form-label">Exercise Type</label>
          <select
            id="ex-type"
            className="form-control"
            value={exerciseType}
            onChange={(e) => setExerciseType(e.target.value)}
          >
            <option value="MEMORY">MEMORY</option>
            <option value="ATTENTION">ATTENTION</option>
            <option value="LOGIC">LOGIC</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="ex-diff" className="form-label">Difficulty Level</label>
          <select
            id="ex-diff"
            className="form-control"
            value={difficultyLevel}
            onChange={(e) => setDifficultyLevel(e.target.value)}
          >
            <option value={1}>Easy (Level 1)</option>
            <option value={2}>Medium (Level 2)</option>
            <option value={3}>Hard (Level 3)</option>
          </select>
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="ex-desc" className="form-label">Description</label>
        <textarea
          id="ex-desc"
          rows="3"
          className="form-control"
          placeholder="Describe the cognitive benefits and mechanics..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="ex-instructions" className="form-label">Step-by-Step Instructions</label>
        <textarea
          id="ex-instructions"
          rows="3"
          className="form-control"
          placeholder="Instructions for the trainee during execution..."
          value={instructions}
          onChange={(e) => setInstructions(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label className="form-label">Reference Material / Audio Prompt (Optional)</label>
        <input type="file" className="form-control" accept="image/*,audio/*,.json" />
      </div>

      <div className="modal-footer">
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
          {loading ? 'Saving...' : isEdit ? 'Update Exercise' : 'Create Exercise'}
        </button>
      </div>
    </form>
  );
};

export default ExerciseForm;
