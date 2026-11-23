import React, { useState } from 'react';

const ReviewModal = ({ deck, isOpen, onClose }) => {
  const [reviewStarted, setReviewStarted] = useState(false);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  if (!isOpen || !deck) return null;

  // Sample cards if none exist
  const sampleCards = [
    { question: 'What is neuroplasticity?', answer: 'The brain\'s ability to reorganize itself by forming new neural connections throughout life.' },
    { question: 'What is spaced repetition?', answer: 'An evidence-based learning technique that incorporates increasing intervals of time between subsequent review of previously learned material.' },
    { question: 'What role does the hippocampus play in memory?', answer: 'Consolidating information from short-term memory to long-term memory.' }
  ];

  const cards = deck.cards && deck.cards.length > 0 ? deck.cards : sampleCards;
  const currentCard = cards[currentCardIndex] || cards[0];

  const handleStartReview = () => {
    setReviewStarted(true);
    setCurrentCardIndex(0);
    setShowAnswer(false);
  };

  const handleNextCard = () => {
    setShowAnswer(false);
    if (currentCardIndex + 1 < cards.length) {
      setCurrentCardIndex((prev) => prev + 1);
    } else {
      // Completed
      setReviewStarted(false);
    }
  };

  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true">
      <div className="modal-content" style={{ maxWidth: '600px' }}>
        <div className="modal-header">
          <div>
            <h2 className="modal-title">{deck.title}</h2>
            <span className="badge badge-primary" style={{ marginTop: '0.25rem' }}>
              {deck.category}
            </span>
          </div>
          <button
            type="button"
            className="modal-close-btn"
            onClick={onClose}
            aria-label="Close"
          >
            &times;
          </button>
        </div>

        {!reviewStarted ? (
          <div>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '1rem',
                margin: '1.5rem 0',
                padding: '1rem',
                backgroundColor: '#f8fafc',
                borderRadius: '10px',
                textAlign: 'center'
              }}
            >
              <div>
                <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#2563eb' }}>
                  {deck.cardCount !== undefined ? deck.cardCount : cards.length}
                </div>
                <div style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 600 }}>
                  Total Cards
                </div>
              </div>
              <div>
                <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#16a34a' }}>
                  92%
                </div>
                <div style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 600 }}>
                  Retention Rate
                </div>
              </div>
              <div>
                <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#d97706' }}>
                  Stage 3
                </div>
                <div style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 600 }}>
                  Interval Level
                </div>
              </div>
            </div>

            <p style={{ color: '#475569', fontSize: '0.925rem', lineHeight: 1.6 }}>
              Spaced repetition optimizes your cognitive intervals to strengthen synaptic pathways and ensure permanent long-term retention.
            </p>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={onClose}
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleStartReview}
              >
                Start Spaced Repetition
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: '1rem',
                fontSize: '0.85rem',
                color: '#64748b',
                fontWeight: 600
              }}
            >
              <span>Card {currentCardIndex + 1} of {cards.length}</span>
              <span>Spaced Repetition Active</span>
            </div>

            <div
              style={{
                minHeight: '180px',
                padding: '1.5rem',
                backgroundColor: '#f8fafc',
                border: '1px solid #e2e8f0',
                borderRadius: '12px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                textAlign: 'center',
                margin: '1rem 0'
              }}
            >
              <div style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '0.5rem', fontWeight: 600 }}>
                QUESTION
              </div>
              <div style={{ fontSize: '1.15rem', fontWeight: 700, color: '#0f172a', marginBottom: '1rem' }}>
                {currentCard.question}
              </div>

              {showAnswer ? (
                <div
                  style={{
                    marginTop: '1rem',
                    paddingTop: '1rem',
                    borderTop: '1px dashed #cbd5e1',
                    animation: 'fadeIn 0.2s ease-in'
                  }}
                >
                  <div style={{ fontSize: '0.85rem', color: '#2563eb', marginBottom: '0.25rem', fontWeight: 600 }}>
                    ANSWER
                  </div>
                  <div style={{ fontSize: '1rem', color: '#334155' }}>
                    {currentCard.answer}
                  </div>
                </div>
              ) : (
                <button
                  type="button"
                  className="btn btn-secondary btn-sm"
                  onClick={() => setShowAnswer(true)}
                  style={{ alignSelf: 'center', marginTop: '0.5rem' }}
                >
                  Show Answer
                </button>
              )}
            </div>

            {showAnswer && (
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  gap: '1rem',
                  marginTop: '1.5rem'
                }}
              >
                <button
                  type="button"
                  className="btn btn-outline-danger"
                  onClick={() => handleNextCard(false)}
                >
                  Hard (Repeat Soon)
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => handleNextCard(true)}
                >
                  Good (Advance Interval)
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewModal;
