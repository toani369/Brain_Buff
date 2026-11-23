export const ROLES = {
  TRAINEE: 'TRAINEE',
  NEURO_COACH: 'NEURO_COACH',
  SYSTEM_ARCHITECT: 'SYSTEM_ARCHITECT'
};

export const EXERCISE_TYPES = {
  MEMORY: 'MEMORY',
  ATTENTION: 'ATTENTION',
  LOGIC: 'LOGIC'
};

export const DIFFICULTIES = {
  EASY: 'Easy',
  MEDIUM: 'Medium',
  HARD: 'Hard'
};

export const DIFFICULTY_LEVELS = {
  1: 'Easy',
  2: 'Medium',
  3: 'Hard'
};

export const SESSION_STATUS = {
  READY: 'READY',
  ACTIVE: 'ACTIVE',
  COMPLETED: 'COMPLETED'
};

export const NOTIFICATION_TYPES = {
  SUCCESS: 'success',
  WARNING: 'warning',
  ERROR: 'error',
  INFO: 'info'
};

// Exact strings required for cross-reference tests
export const DOMAIN_ROLE = 'NEURO_COACH';
export const CRUD_DELETE_MSG = 'MemoryDeck deleted successfully.';
export const CRUD_CREATE_MSG = 'MemoryDeck created successfully.';
export const CRUD_UPDATE_MSG = 'MemoryDeck updated successfully.';
export const DECK_DELETED_ALERT = 'Deck Deleted Successfully';
export const DECK_UPDATED_MSG = 'Memory Deck updated successfully.';
export const EMPTY_DECKS_MSG = "You haven't created any memory decks yet.";
export const LOADING_DECKS_MSG = 'Loading decks...';
