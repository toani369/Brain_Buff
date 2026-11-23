import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import programService from '../../services/programService';

const ProgramForm = ({ initialData, onSuccess, onCancel }) => {
  const { exercises } = useSelector((state) => state.exercises);
  const { user } = useSelector((state) => state.auth);

  const [name, setName] = useState(initialData?.name || '');
  const [targetFocusArea, setTargetFocusArea] = useState(
    initialData?.targetFocusArea || initialData?.focusArea || ''
  );
  const [durationWeeks, setDurationWeeks] = useState(
    initialData?.durationWeeks || initialData?.duration || 4
  );
  const [selectedExerciseIds, setSelectedExerciseIds] = useState(
    initialData?.exercises ? initialData.exercises.map((e) => e.id) : [1]
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const isEdit = !!initialData?.id;

  const availableExercises =
    exercises && exercises.length > 0
      ? exercises
      : [
          { id: 1, title: 'Dual-N-Back Working Memory', exerciseType: 'MEMORY' },
          { id: 2, title: 'Selective Stroop Attention', exerciseType: 'ATTENTION' },
          { id: 3, title: 'Matrix Syllogism Deductions', exerciseType: 'LOGIC' }
        ];

  const handleToggleExercise = (id) => {
    setSelectedExerciseIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!name.trim()) {
      setError('Program Name is required');
      return;
    }
    if (!targetFocusArea.trim()) {
      setError('Focus Area is required');
      return;
    }
    if (Number(durationWeeks) <= 0) {
      setError('Duration must be greater than 0');
      return;
    }
    if (selectedExerciseIds.length === 0) {
      setError('Please select at least one exercise');
      return;
    }

    setLoading(true);

    const payload = {
      name,
      targetFocusArea,
      durationWeeks: Number(durationWeeks),
      coach: {
        id: user?.id || undefined,
        username: user?.username || ''
      },
      exercises: selectedExerciseIds.map((id) => ({ id }))
    };

    try {
      if (isEdit) {
        await programService.update(initialData.id, payload);
        setSuccess('Program updated successfully');
      } else {
        await programService.create(payload);
        setSuccess('Program created successfully');
      }
      if (onSuccess) onSuccess();
    } catch (err) {
      const msg =
        (err.response && err.response.data && (err.response.data.message || err.response.data)) ||
        err.message ||
        'Failed to save program';
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

      {success && (
        <div
          role="status"
          style={{
            backgroundColor: '#f0fdf4',
            border: '1px solid #bbf7d0',
            color: '#16a34a',
            borderRadius: '8px',
            padding: '0.75rem 1rem',
            marginBottom: '1rem',
            fontSize: '0.875rem'
          }}
        >
          {success}
        </div>
      )}

      <div className="form-group">
        <label htmlFor="prog-name" className="form-label">
          Program Name
        </label>
        <input
          id="prog-name"
          type="text"
          className="form-control"
          placeholder="e.g. Working Memory Enhancement Protocol"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        <div className="form-group">
          <label htmlFor="prog-focus" className="form-label">
            Focus Area
          </label>
          <input
            id="prog-focus"
            type="text"
            className="form-control"
            placeholder="e.g. Working Memory, Attention, Speed"
            value={targetFocusArea}
            onChange={(e) => setTargetFocusArea(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="prog-duration" className="form-label">
            Duration
          </label>
          <input
            id="prog-duration"
            type="number"
            min="1"
            className="form-control"
            placeholder="Duration in weeks (e.g. 4)"
            value={durationWeeks}
            onChange={(e) => setDurationWeeks(e.target.value)}
            required
          />
        </div>
      </div>

      <div className="form-group">
        <label className="form-label">Select Cognitive Exercises</label>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem',
            maxHeight: '180px',
            overflowY: 'auto',
            padding: '0.75rem',
            backgroundColor: '#f8fafc',
            border: '1px solid #e2e8f0',
            borderRadius: '8px'
          }}
        >
          {availableExercises.map((ex) => {
            const isChecked = selectedExerciseIds.includes(ex.id);
            return (
              <label
                key={ex.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                  padding: '0.35rem 0.5rem',
                  borderRadius: '6px',
                  backgroundColor: isChecked ? '#eff6ff' : 'transparent'
                }}
              >
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => handleToggleExercise(ex.id)}
                  style={{ cursor: 'pointer' }}
                />
                <span style={{ fontWeight: isChecked ? 600 : 400, color: '#0f172a' }}>
                  {ex.title}
                </span>
                <span className="badge badge-primary" style={{ marginLeft: 'auto', fontSize: '0.7rem' }}>
                  {ex.exerciseType || 'MEMORY'}
                </span>
              </label>
            );
          })}
        </div>
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
          {loading ? 'Saving...' : isEdit ? 'Update Program' : 'Create Program'}
        </button>
      </div>
    </form>
  );
};

export default ProgramForm;
