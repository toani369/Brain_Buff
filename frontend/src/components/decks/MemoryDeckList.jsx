// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { deleteDeck } from '../../store/slices/deckSlice';
// import deckService from '../../services/deckService';
// import MemoryDeckForm from './MemoryDeckForm';
// import ReviewModal from './ReviewModal';
// import LoadingSpinner from '../common/LoadingSpinner';
// import EmptyState from '../common/EmptyState';

// const MemoryDeckList = () => {
//   const dispatch = useDispatch();
//   const { decks, loading, error } = useSelector((state) => state.decks);
//   const { role, user } = useSelector((state) => state.auth);

//   const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
//   const [editingDeck, setEditingDeck] = useState(null);
//   const [reviewDeck, setReviewDeck] = useState(null);

//   useEffect(() => {
//     // Call domain service getAll on mount
//     deckService.getAll()
//       .then((data) => {
//         dispatch({ type: 'decks/fetchAll/fulfilled', payload: data });
//       })
//       .catch((err) => {
//         const msg = (err.response && err.response.data && (err.response.data.message || err.response.data)) || err.message || 'Failed to load decks';
//         dispatch({ type: 'decks/fetchAll/rejected', payload: msg });
//       });
//   }, [dispatch]);

//   const handleDelete = async (id) => {
//     const isConfirmed = window.confirm ? window.confirm('Are you sure you want to delete this deck?') : true;
//     if (isConfirmed) {
//       try {
//         await deckService.delete(id);
//         dispatch(deleteDeck.fulfilled({ id }));
//         if (typeof window !== 'undefined' && window.alert) {
//           window.alert('Deck Deleted Successfully');
//         }
//       } catch (err) {
//         const msg = (err.response && err.response.data && (err.response.data.message || err.response.data)) || err.message || 'Failed to delete deck';
//         if (typeof window !== 'undefined' && window.alert) {
//           window.alert(msg);
//         }
//       }
//     }
//   };

//   const handleReview = (deck) => {
//     setReviewDeck(deck);
//   };

//   const handleEdit = (deck) => {
//     setEditingDeck(deck);
//   };

//   const canCreate = !role || ['TRAINEE', 'NEURO_COACH', 'SYSTEM_ARCHITECT'].includes(role) || !!user;

//   return (
//     <div style={{ width: '100%' }}>
//       <div
//         style={{
//           display: 'flex',
//           justifyContent: 'space-between',
//           alignItems: 'center',
//           marginBottom: '1.5rem',
//           flexWrap: 'wrap',
//           gap: '1rem'
//         }}
//       >
//         <div>
//           <h1
//             style={{
//               fontSize: '1.75rem',
//               fontWeight: 800,
//               color: '#0f172a',
//               letterSpacing: '-0.025em'
//             }}
//           >
//             Memory Hub
//           </h1>
//           <p style={{ color: '#64748b', fontSize: '0.925rem', marginTop: '0.25rem' }}>
//             Spaced repetition memory decks for cognitive retention
//           </p>
//         </div>

//         {canCreate && (
//           <button
//             type="button"
//             className="btn btn-primary"
//             onClick={() => setIsCreateModalOpen(true)}
//           >
//             Create New Deck
//           </button>
//         )}
//       </div>

//       {error && (
//         <div
//           role="alert"
//           style={{
//             backgroundColor: '#fef2f2',
//             border: '1px solid #fecaca',
//             color: '#dc2626',
//             borderRadius: '8px',
//             padding: '0.75rem 1rem',
//             marginBottom: '1.5rem'
//           }}
//         >
//           {typeof error === 'string' ? error : 'Failed to load decks'}
//         </div>
//       )}

//       {loading ? (
//         <div style={{ textAlign: 'center', padding: '3rem 0' }}>
//           <LoadingSpinner message="Loading decks..." />
//         </div>
//       ) : decks && decks.length > 0 ? (
//         <div className="table-container">
//           <table className="app-table">
//             <thead>
//               <tr>
//                 <th>Title</th>
//                 <th>Category</th>
//                 <th>Cards</th>
//                 <th style={{ textAlign: 'right' }}>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {decks.map((deck) => (
//                 <tr key={deck.id || deck.title}>
//                   <td style={{ fontWeight: 600, color: '#0f172a' }}>
//                     {deck.title}
//                   </td>
//                   <td>
//                     <span className="badge badge-primary">
//                       {deck.category}
//                     </span>
//                   </td>
//                   <td>
//                     <span style={{ fontWeight: 500 }}>
//                       {deck.cardCount !== undefined ? deck.cardCount : (deck.cards ? deck.cards.length : 0)}
//                     </span>
//                   </td>
//                   <td style={{ textAlign: 'right' }}>
//                     <div style={{ display: 'inline-flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
//                       <button
//                         type="button"
//                         className="btn btn-outline-primary btn-sm"
//                         onClick={() => handleReview(deck)}
//                       >
//                         Review
//                       </button>
//                       <button
//                         type="button"
//                         className="btn btn-outline-danger btn-sm"
//                         onClick={() => handleDelete(deck.id)}
//                       >
//                         Delete
//                       </button>
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       ) : (
//         <EmptyState
//           icon="🗂️"
//           title="No Decks Found"
//           description="You haven't created any memory decks yet."
//         />
//       )}

//       {/* Create / Edit Modal */}
//       {(isCreateModalOpen || editingDeck) && (
//         <div className="modal-backdrop" role="dialog" aria-modal="true">
//           <div className="modal-content">
//             <div className="modal-header">
//               <h2 className="modal-title">
//                 {editingDeck ? 'Edit Memory Deck' : 'Create New Memory Deck'}
//               </h2>
//               <button
//                 type="button"
//                 className="modal-close-btn"
//                 onClick={() => {
//                   setIsCreateModalOpen(false);
//                   setEditingDeck(null);
//                 }}
//                 aria-label="Close"
//               >
//                 &times;
//               </button>
//             </div>
//             <MemoryDeckForm
//               initialData={editingDeck}
//               onSuccess={() => {
//                 setIsCreateModalOpen(false);
//                 setEditingDeck(null);
//                 deckService.getAll().then((data) => {
//                   dispatch({ type: 'decks/fetchAll/fulfilled', payload: data });
//                 }).catch(() => {});
//               }}
//               onCancel={() => {
//                 setIsCreateModalOpen(false);
//                 setEditingDeck(null);
//               }}
//             />
//           </div>
//         </div>
//       )}

//       {/* Review Modal */}
//       {reviewDeck && (
//         <ReviewModal
//           deck={reviewDeck}
//           isOpen={!!reviewDeck}
//           onClose={() => setReviewDeck(null)}
//         />
//       )}
//     </div>
//   );
// };

// export default MemoryDeckList;


import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteDeck } from '../../store/slices/deckSlice';
import deckService from '../../services/deckService';
import MemoryDeckForm from './MemoryDeckForm';
import ReviewModal from './ReviewModal';
import LoadingSpinner from '../common/LoadingSpinner';
import EmptyState from '../common/EmptyState';

const MemoryDeckList = () => {
  const dispatch = useDispatch();

  const { decks, loading, error } = useSelector((state) => state.decks);
  const { role, user } = useSelector((state) => state.auth);

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingDeck, setEditingDeck] = useState(null);
  const [reviewDeck, setReviewDeck] = useState(null);

  useEffect(() => {
    // Call domain service getAll on mount
    deckService
      .getAll()
      .then((data) => {
        dispatch({
          type: 'decks/fetchAll/fulfilled',
          payload: data
        });
      })
      .catch((err) => {
        const msg =
          (err.response &&
            err.response.data &&
            (err.response.data.message || err.response.data)) ||
          err.message ||
          'Failed to load decks';

        dispatch({
          type: 'decks/fetchAll/rejected',
          payload: msg
        });
      });
  }, [dispatch]);

  const handleDelete = async (id) => {
    const isConfirmed = window.confirm
      ? window.confirm('Are you sure you want to delete this deck?')
      : true;

    if (isConfirmed) {
      try {
        await deckService.delete(id);

        dispatch(
          deleteDeck.fulfilled({
            id
          })
        );

        if (typeof window !== 'undefined' && window.alert) {
          window.alert('Deck Deleted Successfully');
        }
      } catch (err) {
        const msg =
          (err.response &&
            err.response.data &&
            (err.response.data.message || err.response.data)) ||
          err.message ||
          'Failed to delete deck';

        if (typeof window !== 'undefined' && window.alert) {
          window.alert(msg);
        }
      }
    }
  };

  const handleReview = (deck) => {
    setReviewDeck(deck);
  };

  const canCreate =
    !role ||
    ['TRAINEE', 'NEURO_COACH', 'SYSTEM_ARCHITECT'].includes(role) ||
    !!user;

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
            Memory Hub
          </h1>

          <p
            style={{
              color: '#64748b',
              fontSize: '0.925rem',
              marginTop: '0.25rem'
            }}
          >
            Spaced repetition memory decks for cognitive retention
          </p>
        </div>

        {canCreate && (
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => setIsCreateModalOpen(true)}
          >
            Create New Deck
          </button>
        )}
      </div>

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
          {typeof error === 'string'
            ? error
            : 'Failed to load decks'}
        </div>
      )}

      {loading ? (
        <div
          style={{
            textAlign: 'center',
            padding: '3rem 0'
          }}
        >
          <LoadingSpinner message="Loading decks..." />
        </div>
      ) : decks && decks.length > 0 ? (
        <div className="table-container">
          <table className="app-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Category</th>
                <th>Cards</th>
                <th style={{ textAlign: 'right' }}>
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {decks.map((deck) => (
                <tr key={deck.id || deck.title}>
                  <td
                    style={{
                      fontWeight: 600,
                      color: '#0f172a'
                    }}
                  >
                    {deck.title}
                  </td>

                  <td>
                    <span className="badge badge-primary">
                      {deck.category}
                    </span>
                  </td>

                  <td>
                    <span style={{ fontWeight: 500 }}>
                      {deck.cardCount !== undefined
                        ? deck.cardCount
                        : deck.cards
                        ? deck.cards.length
                        : 0}
                    </span>
                  </td>

                  <td style={{ textAlign: 'right' }}>
                    <div
                      style={{
                        display: 'inline-flex',
                        gap: '0.5rem',
                        justifyContent: 'flex-end'
                      }}
                    >
                      <button
                        type="button"
                        className="btn btn-outline-primary btn-sm"
                        onClick={() => handleReview(deck)}
                      >
                        Review
                      </button>

                      <button
                        type="button"
                        className="btn btn-outline-danger btn-sm"
                        onClick={() => handleDelete(deck.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <EmptyState
          icon="🗂️"
          title="No Decks Found"
          description="You haven't created any memory decks yet."
        />
      )}

      {/* Create / Edit Modal */}
      {(isCreateModalOpen || editingDeck) && (
        <div
          className="modal-backdrop"
          role="dialog"
          aria-modal="true"
        >
          <div className="modal-content">
            <div className="modal-header">
              <h2 className="modal-title">
                {editingDeck
                  ? 'Edit Memory Deck'
                  : 'Create New Memory Deck'}
              </h2>

              <button
                type="button"
                className="modal-close-btn"
                onClick={() => {
                  setIsCreateModalOpen(false);
                  setEditingDeck(null);
                }}
                aria-label="Close"
              >
                &times;
              </button>
            </div>

            <MemoryDeckForm
              initialData={editingDeck}
              onSuccess={() => {
                setIsCreateModalOpen(false);
                setEditingDeck(null);

                deckService
                  .getAll()
                  .then((data) => {
                    dispatch({
                      type: 'decks/fetchAll/fulfilled',
                      payload: data
                    });
                  })
                  .catch(() => {});
              }}
              onCancel={() => {
                setIsCreateModalOpen(false);
                setEditingDeck(null);
              }}
            />
          </div>
        </div>
      )}

      {/* Review Modal */}
      {reviewDeck && (
        <ReviewModal
          deck={reviewDeck}
          isOpen={!!reviewDeck}
          onClose={() => setReviewDeck(null)}
        />
      )}
    </div>
  );
};

export default MemoryDeckList;