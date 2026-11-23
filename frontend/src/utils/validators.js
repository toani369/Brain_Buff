export const validateEmail = (email) => {
  if (!email) return 'Email is required';
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) return 'Invalid email address';
  return null;
};

export const validateUsername = (username) => {
  if (!username || username.trim() === '') return 'Username is required';
  if (username.length < 3) return 'Username must be at least 3 characters';
  return null;
};

export const validatePassword = (password) => {
  if (!password) return 'Password is required';
  if (password.length < 4) return 'Password must be at least 4 characters';
  return null;
};

export const validateDeckForm = (values) => {
  const errors = {};
  if (!values.title || !values.title.trim()) {
    errors.title = 'Deck title is required';
  }
  if (!values.category || !values.category.trim()) {
    errors.category = 'Category is required';
  }
  if (values.cardCount !== undefined && (isNaN(values.cardCount) || Number(values.cardCount) < 0)) {
    errors.cardCount = 'Initial card count must be a non-negative number';
  }
  return errors;
};

export const validateExerciseForm = (values) => {
  const errors = {};
  if (!values.title || !values.title.trim()) {
    errors.title = 'Title is required';
  }
  if (!values.exerciseType) {
    errors.exerciseType = 'Exercise type is required';
  }
  if (!values.difficultyLevel) {
    errors.difficultyLevel = 'Difficulty level is required';
  }
  if (!values.description || !values.description.trim()) {
    errors.description = 'Description is required';
  }
  if (!values.instructions || !values.instructions.trim()) {
    errors.instructions = 'Instructions are required';
  }
  return errors;
};

export const validateProgramForm = (values) => {
  const errors = {};
  if (!values.name || !values.name.trim()) {
    errors.name = 'Program name is required';
  }
  if (!values.targetFocusArea || !values.targetFocusArea.trim()) {
    errors.targetFocusArea = 'Focus area is required';
  }
  if (!values.durationWeeks || Number(values.durationWeeks) <= 0) {
    errors.durationWeeks = 'Duration must be greater than 0';
  }
  if (!values.exerciseIds || values.exerciseIds.length === 0) {
    errors.exerciseIds = 'At least one exercise must be selected';
  }
  return errors;
};
