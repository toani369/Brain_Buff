import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchPrograms, enrollProgram, deleteProgram } from '../../store/slices/programSlice';
import { fetchExercises } from '../../store/slices/exerciseSlice';
import SearchFilterBar from '../common/SearchFilterBar';
import LoadingSpinner from '../common/LoadingSpinner';
import EmptyState from '../common/EmptyState';
import ProgramForm from './ProgramForm';

const ProgramList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { programs, enrolledProgramIds, loading, error } = useSelector((state) => state.programs);
  const { exercises: availableExercises } = useSelector((state) => state.exercises);
  const { role, user } = useSelector((state) => state.auth);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFocus, setSelectedFocus] = useState('ALL');
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editingProgram, setEditingProgram] = useState(null);

  // Expandable programs to show modules
  const [expandedProgramIds, setExpandedProgramIds] = useState([1]);
  // Selected module for status detail modal
  const [selectedModuleModal, setSelectedModuleModal] = useState(null);

  const currentRole = (role || user?.role || '').toUpperCase();
  const canManage = currentRole === 'NEURO_COACH' || currentRole === 'SYSTEM_ARCHITECT';

  // Seed default programs if none fetched
  const defaultPrograms = [
    {
      id: 1,
      name: 'Working Memory Enhancement Protocol',
      targetFocusArea: 'Working Memory',
      durationWeeks: 4,
      exercises: [
        { id: 1, title: 'Dual-N-Back Working Memory', exerciseType: 'MEMORY' },
        { id: 2, title: 'Selective Stroop Attention', exerciseType: 'ATTENTION' }
      ]
    },
    {
      id: 2,
      name: 'Speed Processing & Cognitive Agility',
      targetFocusArea: 'Processing Speed',
      durationWeeks: 6,
      exercises: [
        { id: 2, title: 'Selective Stroop Attention', exerciseType: 'ATTENTION' },
        { id: 3, title: 'Matrix Syllogism Deductions', exerciseType: 'LOGIC' }
      ]
    },
    {
      id: 3,
      name: 'Executive Function Mastery',
      targetFocusArea: 'Executive Function',
      durationWeeks: 8,
      exercises: [
        { id: 1, title: 'Dual-N-Back Working Memory', exerciseType: 'MEMORY' },
        { id: 3, title: 'Matrix Syllogism Deductions', exerciseType: 'LOGIC' }
      ]
    }
  ];

  // Persistent module statuses state
  const [moduleStatuses, setModuleStatuses] = useState(() => {
    try {
      const saved = localStorage.getItem('brainbuff_module_statuses');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    // Default initial statuses: Program 1 has Module 1 completed, Module 2 in progress (50% progress)
    return {
      '1_1': 'COMPLETED',
      '1_2': 'IN_PROGRESS'
    };
  });

  const updateModuleStatus = (programId, moduleId, newStatus) => {
    setModuleStatuses((prev) => {
      const updated = {
        ...prev,
        [`${programId}_${moduleId}`]: newStatus
      };
      try {
        localStorage.setItem('brainbuff_module_statuses', JSON.stringify(updated));
      } catch {
        // ignore
      }
      return updated;
    });

    if (selectedModuleModal && selectedModuleModal.id === moduleId && selectedModuleModal.programId === programId) {
      setSelectedModuleModal((prev) => (prev ? { ...prev, status: newStatus } : null));
    }
  };

  const cycleModuleStatus = (programId, moduleId, e) => {
    if (e) e.stopPropagation();
    const current = moduleStatuses[`${programId}_${moduleId}`] || 'IN_PROGRESS';
    const next = current === 'COMPLETED' ? 'IN_PROGRESS' : 'COMPLETED';
    updateModuleStatus(programId, moduleId, next);
  };

  const toggleProgramExpanded = (programId) => {
    setExpandedProgramIds((prev) =>
      prev.includes(programId) ? prev.filter((id) => id !== programId) : [...prev, programId]
    );
  };

  const programList = programs && programs.length > 0 ? programs : defaultPrograms;

  useEffect(() => {
    dispatch(fetchPrograms());
    dispatch(fetchExercises());
  }, [dispatch]);

  const filteredPrograms = programList.filter((p) => {
    const matchesSearch =
      !searchTerm ||
      (p.name && p.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (p.targetFocusArea && p.targetFocusArea.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesFocus =
      selectedFocus === 'ALL' ||
      (p.targetFocusArea && p.targetFocusArea.toUpperCase().includes(selectedFocus.toUpperCase()));

    return matchesSearch && matchesFocus;
  });

  const handleEnroll = (id) => {
    dispatch(enrollProgram(id));
    if (!expandedProgramIds.includes(id)) {
      setExpandedProgramIds((prev) => [...prev, id]);
    }
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this program?')) {
      dispatch(deleteProgram(id));
    }
  };

  // Helper to retrieve modules for a program
  const getModulesForProgram = (prog) => {
    if (prog.exercises && prog.exercises.length > 0) {
      return prog.exercises.map((ex, index) => {
        const fullEx = availableExercises?.find((e) => e.id === ex.id) || {};
        return {
          id: ex.id || index + 1,
          title: ex.title || fullEx.title || `Module ${index + 1}: ${prog.targetFocusArea || 'Cognitive Training'}`,
          exerciseType: ex.exerciseType || fullEx.exerciseType || 'MEMORY',
          difficultyLevel: ex.difficultyLevel || fullEx.difficultyLevel || 2,
          description: ex.description || fullEx.description || 'Targeted cognitive optimization drill.',
          instructions: ex.instructions || fullEx.instructions || 'Follow on-screen instructions to complete the session.'
        };
      });
    }

    return [
      {
        id: 1,
        title: `${prog.targetFocusArea || 'Cognitive'} Core Protocol`,
        exerciseType: 'MEMORY',
        difficultyLevel: 2,
        description: 'Comprehensive baseline exercise for neural priming.',
        instructions: 'Complete continuous trials to measure accuracy and reaction time.'
      },
      {
        id: 2,
        title: `${prog.targetFocusArea || 'Cognitive'} Speed & Precision`,
        exerciseType: 'ATTENTION',
        difficultyLevel: 1,
        description: 'Cognitive interference suppression and reaction optimization.',
        instructions: 'Respond quickly while ignoring conflicting sensory cues.'
      }
    ];
  };

  // Calculate overall program completion stats
  const getProgramStats = (prog) => {
    const modules = getModulesForProgram(prog);
    const total = modules.length;
    let completed = 0;
    let inProgress = 0;

    modules.forEach((mod) => {
      const st = moduleStatuses[`${prog.id}_${mod.id}`] || 'IN_PROGRESS';
      if (st === 'COMPLETED') completed += 1;
      else inProgress += 1;
    });

    const percent = total > 0 ? Math.round((completed / total) * 100) : 0;
    const status = percent === 100 ? 'COMPLETED' : 'IN_PROGRESS';

    return { total, completed, inProgress, percent, status };
  };

  const getStatusBadge = (status) => {
    if (status === 'COMPLETED') {
      return (
        <span
          className="badge badge-success"
          style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}
        >
          <span>✓</span> Completed
        </span>
      );
    }
    return (
      <span
        className="badge badge-warning"
        style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}
      >
        <span>⏳</span> In Progress
      </span>
    );
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
            Training Programs
          </h1>
          <p style={{ color: '#64748b', fontSize: '0.925rem', marginTop: '0.25rem' }}>
            Structured, multi-week cognitive training regimens curated by Neuro Coaches
          </p>
        </div>

        {canManage && (
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => setIsCreateOpen(true)}
          >
            + Create Program
          </button>
        )}
      </div>

      <SearchFilterBar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        category={selectedFocus}
        onCategoryChange={setSelectedFocus}
        categories={[
          { value: 'MEMORY', label: 'Memory' },
          { value: 'PROCESSING', label: 'Processing Speed' },
          { value: 'EXECUTIVE', label: 'Executive Function' }
        ]}
        categoryLabel="Focus Area"
        onClear={() => {
          setSearchTerm('');
          setSelectedFocus('ALL');
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
          {typeof error === 'string' ? error : 'Failed to load programs'}
        </div>
      )}

      {loading ? (
        <LoadingSpinner message="Loading programs..." />
      ) : filteredPrograms.length > 0 ? (
        <div className="table-container">
          <table className="app-table">
            <thead>
              <tr>
                <th style={{ width: '30%' }}>Program Name</th>
                <th style={{ width: '15%' }}>Focus Area</th>
                <th style={{ width: '12%' }}>Duration</th>
                <th style={{ width: '25%' }}>Overall Progress</th>
                <th style={{ width: '18%', textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPrograms.map((prog) => {
                const isEnrolled = enrolledProgramIds.includes(prog.id);
                const isExpanded = expandedProgramIds.includes(prog.id);
                const focusArea = prog.targetFocusArea || prog.focusArea || 'General Cognition';
                const duration = prog.durationWeeks ? `${prog.durationWeeks} weeks` : (prog.duration || '4 weeks');
                const modules = getModulesForProgram(prog);
                const stats = getProgramStats(prog);

                return (
                  <React.Fragment key={prog.id || prog.name}>
                    {/* Primary Program Row */}
                    <tr
                      style={{
                        backgroundColor: isExpanded ? '#f8fafc' : 'inherit',
                        transition: 'background-color 0.15s ease'
                      }}
                    >
                      <td>
                        <div>
                          <div
                            style={{
                              fontWeight: 600,
                              color: '#0f172a',
                              fontSize: '0.975rem',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '0.5rem'
                            }}
                            onClick={() => toggleProgramExpanded(prog.id)}
                            title="Click to view module breakdown"
                          >
                            <span>{prog.name}</span>
                            <span
                              style={{
                                fontSize: '0.75rem',
                                color: '#3b82f6',
                                fontWeight: 500,
                                userSelect: 'none'
                              }}
                            >
                              {isExpanded ? '▲' : '▼'}
                            </span>
                          </div>

                          <div
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '0.75rem',
                              fontSize: '0.8rem',
                              color: '#64748b',
                              marginTop: '0.35rem'
                            }}
                          >
                            <span>
                              {modules.length} module{modules.length > 1 ? 's' : ''} included
                            </span>
                            <span>•</span>
                            <button
                              type="button"
                              onClick={() => toggleProgramExpanded(prog.id)}
                              style={{
                                background: 'none',
                                border: 'none',
                                padding: 0,
                                color: '#2563eb',
                                fontSize: '0.8rem',
                                fontWeight: 600,
                                cursor: 'pointer',
                                textDecoration: 'underline'
                              }}
                            >
                              {isExpanded ? 'Hide Modules' : 'View Modules & Status'}
                            </button>
                          </div>
                        </div>
                      </td>

                      <td>
                        <span className="badge badge-primary">{focusArea}</span>
                      </td>

                      <td>
                        <span style={{ fontWeight: 500, color: '#334155' }}>{duration}</span>
                      </td>

                      {/* Overall Program Progress & Completion Status */}
                      <td>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem' }}>
                            {isEnrolled ? (
                              getStatusBadge(stats.status)
                            ) : (
                              <span
                                className="badge"
                                style={{
                                  backgroundColor: '#f8fafc',
                                  color: '#94a3b8',
                                  border: '1px solid #e2e8f0'
                                }}
                              >
                                Not Enrolled
                              </span>
                            )}
                            <span style={{ fontSize: '0.825rem', fontWeight: 700, color: '#0f172a' }}>
                              {isEnrolled ? `${stats.percent}%` : '0%'}
                            </span>
                          </div>

                          {/* Progress Bar */}
                          <div
                            style={{
                              width: '100%',
                              height: '8px',
                              backgroundColor: '#e2e8f0',
                              borderRadius: '9999px',
                              overflow: 'hidden'
                            }}
                          >
                            <div
                              style={{
                                width: isEnrolled ? `${stats.percent}%` : '0%',
                                height: '100%',
                                backgroundColor:
                                  stats.percent === 100 ? '#16a34a' : stats.percent > 0 ? '#2563eb' : '#cbd5e1',
                                transition: 'width 0.4s ease'
                              }}
                            />
                          </div>

                          <div style={{ fontSize: '0.75rem', color: '#64748b' }}>
                            {isEnrolled
                              ? `${stats.completed} of ${stats.total} modules completed`
                              : 'Enroll to track module progress'}
                          </div>
                        </div>
                      </td>

                      <td style={{ textAlign: 'right' }}>
                        <div style={{ display: 'inline-flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                          <button
                            type="button"
                            className={`btn btn-sm ${isEnrolled ? 'btn-secondary' : 'btn-primary'}`}
                            onClick={() => handleEnroll(prog.id)}
                            disabled={isEnrolled}
                          >
                            {isEnrolled ? '✓ Enrolled' : 'Enroll'}
                          </button>
                          {canManage && (
                            <>
                              <button
                                type="button"
                                className="btn btn-secondary btn-sm"
                                onClick={() => setEditingProgram(prog)}
                              >
                                Edit
                              </button>
                              <button
                                type="button"
                                className="btn btn-outline-danger btn-sm"
                                onClick={() => handleDelete(prog.id)}
                              >
                                Delete
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>

                    {/* Expandable Modules Breakdown Row */}
                    {isExpanded && (
                      <tr style={{ backgroundColor: '#f8fafc' }}>
                        <td colSpan={5} style={{ padding: '1rem 1.5rem', borderTop: 'none' }}>
                          <div
                            style={{
                              backgroundColor: '#ffffff',
                              borderRadius: '10px',
                              border: '1px solid #e2e8f0',
                              padding: '1.25rem',
                              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)'
                            }}
                          >
                            <div
                              style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                marginBottom: '1rem',
                                paddingBottom: '0.75rem',
                                borderBottom: '1px solid #f1f5f9',
                                flexWrap: 'wrap',
                                gap: '0.5rem'
                              }}
                            >
                              <div>
                                <h4
                                  style={{
                                    margin: 0,
                                    fontSize: '0.95rem',
                                    fontWeight: 700,
                                    color: '#0f172a',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem'
                                  }}
                                >
                                  <span>📚</span> Program Modules & Completion Status
                                </h4>
                                <p style={{ margin: '0.2rem 0 0 0', fontSize: '0.8rem', color: '#64748b' }}>
                                  Click any module to view details or click its status badge to toggle completion
                                </p>
                              </div>

                              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <span style={{ fontSize: '0.825rem', color: '#475569', fontWeight: 600 }}>
                                  Overall: {stats.completed}/{stats.total} Completed ({stats.percent}%)
                                </span>
                              </div>
                            </div>

                            {/* Module Cards Grid / List */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                              {modules.map((mod, idx) => {
                                const modStatus = moduleStatuses[`${prog.id}_${mod.id}`] || 'IN_PROGRESS';

                                return (
                                  <div
                                    key={mod.id || idx}
                                    style={{
                                      display: 'flex',
                                      alignItems: 'center',
                                      justifyContent: 'space-between',
                                      padding: '0.75rem 1rem',
                                      borderRadius: '8px',
                                      backgroundColor: modStatus === 'COMPLETED' ? '#f0fdf4' : '#ffffff',
                                      border: `1px solid ${
                                        modStatus === 'COMPLETED' ? '#bbf7d0' : '#fde68a'
                                      }`,
                                      transition: 'all 0.15s ease',
                                      cursor: 'pointer',
                                      flexWrap: 'wrap',
                                      gap: '0.75rem'
                                    }}
                                    onClick={() =>
                                      setSelectedModuleModal({
                                        ...mod,
                                        programId: prog.id,
                                        programName: prog.name,
                                        status: modStatus
                                      })
                                    }
                                    title="Click to view module status & instructions"
                                  >
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                                      <div
                                        style={{
                                          width: '32px',
                                          height: '32px',
                                          borderRadius: '8px',
                                          backgroundColor:
                                            modStatus === 'COMPLETED'
                                              ? '#dcfce7'
                                              : modStatus === 'IN_PROGRESS'
                                              ? '#fef3c7'
                                              : '#f1f5f9',
                                          display: 'flex',
                                          alignItems: 'center',
                                          justifyContent: 'center',
                                          fontSize: '0.9rem',
                                          fontWeight: 700,
                                          color:
                                            modStatus === 'COMPLETED'
                                              ? '#15803d'
                                              : modStatus === 'IN_PROGRESS'
                                              ? '#b45309'
                                              : '#64748b'
                                        }}
                                      >
                                        {modStatus === 'COMPLETED' ? '✓' : idx + 1}
                                      </div>

                                      <div>
                                        <div style={{ fontWeight: 600, color: '#0f172a', fontSize: '0.9rem' }}>
                                          {mod.title}
                                        </div>
                                        <div
                                          style={{
                                            fontSize: '0.78rem',
                                            color: '#64748b',
                                            marginTop: '0.15rem',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '0.5rem'
                                          }}
                                        >
                                          <span className="badge badge-primary" style={{ fontSize: '0.7rem', padding: '0.15rem 0.45rem' }}>
                                            {mod.exerciseType}
                                          </span>
                                          <span>Difficulty: Level {mod.difficultyLevel || 1}</span>
                                        </div>
                                      </div>
                                    </div>

                                    {/* Module Interactive Status Controls */}
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                                      <button
                                        type="button"
                                        onClick={(e) => cycleModuleStatus(prog.id, mod.id, e)}
                                        style={{
                                          background: 'none',
                                          border: 'none',
                                          padding: 0,
                                          cursor: 'pointer'
                                        }}
                                        title="Click to toggle status (In Progress ⇄ Completed)"
                                      >
                                        {getStatusBadge(modStatus)}
                                      </button>

                                      <button
                                        type="button"
                                        className="btn btn-secondary btn-sm"
                                        style={{ fontSize: '0.775rem', padding: '0.25rem 0.6rem' }}
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          setSelectedModuleModal({
                                            ...mod,
                                            programId: prog.id,
                                            programName: prog.name,
                                            status: modStatus
                                          });
                                        }}
                                      >
                                        Status Details
                                      </button>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <EmptyState
          icon="🎯"
          title="No Programs Found"
          description="No training programs available."
          actionLabel={canManage ? "Create Program" : undefined}
          onAction={() => setIsCreateOpen(true)}
        />
      )}

      {/* Module Status & Details Modal (Opened on Click) */}
      {selectedModuleModal && (
        <div className="modal-backdrop" role="dialog" aria-modal="true">
          <div className="modal-content" style={{ maxWidth: '540px' }}>
            <div className="modal-header">
              <div>
                <h2 className="modal-title" style={{ fontSize: '1.2rem', margin: 0 }}>
                  {selectedModuleModal.title}
                </h2>
                <div style={{ fontSize: '0.825rem', color: '#64748b', marginTop: '0.25rem' }}>
                  Part of {selectedModuleModal.programName}
                </div>
              </div>
              <button
                type="button"
                className="modal-close-btn"
                onClick={() => setSelectedModuleModal(null)}
                aria-label="Close"
              >
                &times;
              </button>
            </div>

            <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {/* Current Status Section */}
              <div
                style={{
                  backgroundColor: selectedModuleModal.status === 'COMPLETED' ? '#f0fdf4' : '#fefce8',
                  border: `1px solid ${selectedModuleModal.status === 'COMPLETED' ? '#bbf7d0' : '#fde68a'}`,
                  borderRadius: '8px',
                  padding: '1.1rem'
                }}
              >
                <div style={{ fontSize: '0.825rem', fontWeight: 700, color: '#475569', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                  Module Completion Status
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    {getStatusBadge(selectedModuleModal.status)}
                    <span style={{ fontSize: '0.875rem', color: selectedModuleModal.status === 'COMPLETED' ? '#15803d' : '#92400e', fontWeight: 600 }}>
                      {selectedModuleModal.status === 'COMPLETED'
                        ? 'Mastered — This module is completed'
                        : 'Active — Currently in progress'}
                    </span>
                  </div>

                  <button
                    type="button"
                    className={`btn btn-sm ${selectedModuleModal.status === 'COMPLETED' ? 'btn-secondary' : 'btn-primary'}`}
                    style={{ fontSize: '0.825rem', padding: '0.4rem 0.85rem' }}
                    onClick={() => {
                      const nextStatus = selectedModuleModal.status === 'COMPLETED' ? 'IN_PROGRESS' : 'COMPLETED';
                      updateModuleStatus(selectedModuleModal.programId, selectedModuleModal.id, nextStatus);
                    }}
                  >
                    {selectedModuleModal.status === 'COMPLETED' ? '↩ Revert to In Progress' : '✓ Mark as Completed'}
                  </button>
                </div>
              </div>

              {/* Module Protocol Details */}
              <div>
                <div style={{ fontSize: '0.825rem', fontWeight: 700, color: '#475569', textTransform: 'uppercase', marginBottom: '0.35rem' }}>
                  Module Description & Focus
                </div>
                <p style={{ margin: 0, fontSize: '0.875rem', color: '#334155', lineHeight: 1.5 }}>
                  {selectedModuleModal.description}
                </p>
              </div>

              {selectedModuleModal.instructions && (
                <div>
                  <div style={{ fontSize: '0.825rem', fontWeight: 700, color: '#475569', textTransform: 'uppercase', marginBottom: '0.35rem' }}>
                    Training Protocol Instructions
                  </div>
                  <p style={{ margin: 0, fontSize: '0.85rem', color: '#64748b', lineHeight: 1.5, backgroundColor: '#f1f5f9', padding: '0.65rem 0.85rem', borderRadius: '6px' }}>
                    {selectedModuleModal.instructions}
                  </p>
                </div>
              )}

              {/* Modal Actions */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  alignItems: 'center',
                  gap: '0.75rem',
                  marginTop: '0.5rem',
                  paddingTop: '1rem',
                  borderTop: '1px solid #f1f5f9'
                }}
              >
                <button
                  type="button"
                  className="btn btn-secondary btn-sm"
                  onClick={() => setSelectedModuleModal(null)}
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-primary btn-sm"
                  onClick={() => {
                    const id = selectedModuleModal.id;
                    setSelectedModuleModal(null);
                    navigate(`/training/${id}`);
                  }}
                >
                  🚀 Launch Module Session
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Program Form Modal */}
      {(isCreateOpen || editingProgram) && (
        <div className="modal-backdrop" role="dialog" aria-modal="true">
          <div className="modal-content" style={{ maxWidth: '600px' }}>
            <div className="modal-header">
              <h2 className="modal-title">
                {editingProgram ? 'Edit Training Program' : 'Create Training Program'}
              </h2>
              <button
                type="button"
                className="modal-close-btn"
                onClick={() => {
                  setIsCreateOpen(false);
                  setEditingProgram(null);
                }}
                aria-label="Close"
              >
                &times;
              </button>
            </div>
            <ProgramForm
              initialData={editingProgram}
              onSuccess={() => {
                setIsCreateOpen(false);
                setEditingProgram(null);
                dispatch(fetchPrograms());
              }}
              onCancel={() => {
                setIsCreateOpen(false);
                setEditingProgram(null);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProgramList;
