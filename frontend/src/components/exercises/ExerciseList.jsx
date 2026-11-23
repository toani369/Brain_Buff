import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchExercises, deleteExercise } from '../../store/slices/exerciseSlice';
import SearchFilterBar from '../common/SearchFilterBar';
import LoadingSpinner from '../common/LoadingSpinner';
import EmptyState from '../common/EmptyState';
import ExerciseForm from './ExerciseForm';

const ExerciseList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { exercises, loading, error } = useSelector((state) => state.exercises);
  const { role, user } = useSelector((state) => state.auth);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('ALL');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingExercise, setEditingExercise] = useState(null);

  const currentRole = (role || user?.role || '').toUpperCase();
  const isAdmin = currentRole === 'SYSTEM_ARCHITECT';

  // Seed default exercises if none returned by backend yet
  const defaultExercises = [
    {
      id: 1,
      title: 'Dual-N-Back Working Memory',
      exerciseType: 'MEMORY',
      difficultyLevel: 2,
      description: 'Strengthen continuous working memory update buffers and executive control.',
      instructions: 'Track auditory and spatial stimuli simultaneously. Press match when current stimulus matches N steps back.'
    },
    {
      id: 2,
      title: 'Selective Stroop Attention',
      exerciseType: 'ATTENTION',
      difficultyLevel: 1,
      description: 'Train inhibitory neural control and cognitive flexibility under interference.',
      instructions: 'Identify the ink color of the word while suppressing the semantic meaning.'
    },
    {
      id: 3,
      title: 'Matrix Syllogism Deductions',
      exerciseType: 'LOGIC',
      difficultyLevel: 3,
      description: 'Exercise fluid inductive and deductive relational reasoning.',
      instructions: 'Analyze symbolic premise rules and determine valid conclusions before the timer runs out.'
    }
  ];

  const exerciseList = exercises && exercises.length > 0 ? exercises : defaultExercises;

  useEffect(() => {
    dispatch(fetchExercises());
  }, [dispatch]);

  const filteredExercises = exerciseList.filter((ex) => {
    const matchesSearch =
      !searchTerm ||
      (ex.title && ex.title.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (ex.description && ex.description.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesType =
      selectedType === 'ALL' ||
      (ex.exerciseType && ex.exerciseType.toUpperCase() === selectedType.toUpperCase());

    return matchesSearch && matchesType;
  });

  const getDifficultyLabel = (level) => {
    if (level === 1 || level === '1' || level === 'Easy') return 'Easy';
    if (level === 2 || level === '2' || level === 'Medium') return 'Medium';
    if (level === 3 || level === '3' || level === 'Hard') return 'Hard';
    return 'Medium';
  };

  const getDifficultyBadgeClass = (level) => {
    const label = getDifficultyLabel(level);
    if (label === 'Easy') return 'badge-success';
    if (label === 'Medium') return 'badge-warning';
    return 'badge-danger';
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this exercise?')) {
      dispatch(deleteExercise(id));
    }
  };

  return (
    <div style={{ width: '100%' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '1.5rem',
          flexWrap: 'wrap',
          gap: '1rem'
        }}
      >
        <div>
          <h1
            style={{
              fontSize: '1.75rem',
              fontWeight: 800,
              color: '#0f172a',
              letterSpacing: '-0.025em'
            }}
          >
            Cognitive Exercises
          </h1>
          <p style={{ color: '#64748b', fontSize: '0.925rem', marginTop: '0.25rem' }}>
            Targeted neuro-cognitive modules for neuroplasticity and speed
          </p>
        </div>

        {isAdmin && (
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => setIsFormOpen(true)}
          >
            + Create Exercise
          </button>
        )}
      </div>

      <SearchFilterBar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        category={selectedType}
        onCategoryChange={setSelectedType}
        categories={[
          { value: 'MEMORY', label: 'Memory' },
          { value: 'ATTENTION', label: 'Attention' },
          { value: 'LOGIC', label: 'Logic' }
        ]}
        categoryLabel="Type"
        onClear={() => {
          setSearchTerm('');
          setSelectedType('ALL');
        }}
      />

      {error && (
        <div
          role="alert"
          style={{
            backgroundColor: '#fef2f2',
            border: '1px solid #fecaca',
            color: '#dc2626',
            borderRadius: '8px',
            padding: '0.75rem 1rem',
            marginBottom: '1.5rem'
          }}
        >
          {typeof error === 'string' ? error : 'Failed to load exercises'}
        </div>
      )}

      {loading ? (
        <LoadingSpinner message="Loading exercises..." />
      ) : filteredExercises.length > 0 ? (
        <div className="table-container">
          <table className="app-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Type</th>
                <th>Difficulty</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredExercises.map((ex) => (
                <tr key={ex.id || ex.title}>
                  <td>
                    <div>
                      <div style={{ fontWeight: 600, color: '#0f172a' }}>{ex.title}</div>
                      {ex.description && (
                        <div style={{ fontSize: '0.825rem', color: '#64748b', marginTop: '0.2rem' }}>
                          {ex.description}
                        </div>
                      )}
                    </div>
                  </td>
                  <td>
                    <span className="badge badge-primary">
                      {ex.exerciseType || 'MEMORY'}
                    </span>
                  </td>
                  <td>
                    <span className={`badge ${getDifficultyBadgeClass(ex.difficultyLevel)}`}>
                      {getDifficultyLabel(ex.difficultyLevel)}
                    </span>
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <div style={{ display: 'inline-flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                      <button
                        type="button"
                        className="btn btn-primary btn-sm"
                        onClick={() => navigate(`/training/${ex.id}`)}
                      >
                        Start
                      </button>
                      {isAdmin && (
                        <>
                          <button
                            type="button"
                            className="btn btn-secondary btn-sm"
                            onClick={() => setEditingExercise(ex)}
                          >
                            Edit
                          </button>
                          <button
                            type="button"
                            className="btn btn-outline-danger btn-sm"
                            onClick={() => handleDelete(ex.id)}
                          >
                            Delete
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <EmptyState
          icon="⚡"
          title="No Exercises Found"
          description="No exercises available."
          actionLabel={isAdmin ? "Create Exercise" : undefined}
          onAction={() => setIsFormOpen(true)}
        />
      )}

      {/* Admin Form Modal */}
      {(isFormOpen || editingExercise) && (
        <div className="modal-backdrop" role="dialog" aria-modal="true">
          <div className="modal-content" style={{ maxWidth: '650px' }}>
            <div className="modal-header">
              <h2 className="modal-title">
                {editingExercise ? 'Edit Cognitive Exercise' : 'Create Cognitive Exercise'}
              </h2>
              <button
                type="button"
                className="modal-close-btn"
                onClick={() => {
                  setIsFormOpen(false);
                  setEditingExercise(null);
                }}
                aria-label="Close"
              >
                &times;
              </button>
            </div>
            <ExerciseForm
              initialData={editingExercise}
              onSuccess={() => {
                setIsFormOpen(false);
                setEditingExercise(null);
                dispatch(fetchExercises());
              }}
              onCancel={() => {
                setIsFormOpen(false);
                setEditingExercise(null);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ExerciseList;
