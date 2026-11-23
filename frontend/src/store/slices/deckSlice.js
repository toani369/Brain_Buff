import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import deckService from '../../services/deckService';

export const fetchAll = createAsyncThunk(
  'decks/fetchAll',
  async (params, { rejectWithValue }) => {
    try {
      const data = await deckService.getAll(params);
      return data;
    } catch (error) {
      const message =
        (error.response && error.response.data && (error.response.data.message || error.response.data.error || error.response.data)) ||
        error.message ||
        'Failed to fetch memory decks';
      return rejectWithValue(message);
    }
  }
);

export const fetchDecks = fetchAll;

export const createDeck = createAsyncThunk(
  'decks/create',
  async (deckData, { rejectWithValue }) => {
    try {
      const data = await deckService.create(deckData);
      return data;
    } catch (error) {
      const message =
        (error.response && error.response.data && (error.response.data.message || error.response.data.error || error.response.data)) ||
        error.message ||
        'Failed to create memory deck';
      return rejectWithValue(message);
    }
  }
);

export const updateDeck = createAsyncThunk(
  'decks/update',
  async ({ id, deckData }, { rejectWithValue }) => {
    try {
      const data = await deckService.update(id, deckData);
      return { id, data };
    } catch (error) {
      const message =
        (error.response && error.response.data && (error.response.data.message || error.response.data.error || error.response.data)) ||
        error.message ||
        'Failed to update memory deck';
      return rejectWithValue(message);
    }
  }
);

export const deleteDeck = createAsyncThunk(
  'decks/delete',
  async (id, { rejectWithValue }) => {
    try {
      const data = await deckService.delete(id);
      return { id, data };
    } catch (error) {
      const message =
        (error.response && error.response.data && (error.response.data.message || error.response.data.error || error.response.data)) ||
        error.message ||
        'Failed to delete memory deck';
      return rejectWithValue(message);
    }
  }
);

const initialState = {
  decks: [],
  selectedDeck: null,
  loading: false,
  error: null,
  pagination: {
    totalPages: 0,
    totalElements: 0,
    pageNumber: 0
  }
};

const deckSlice = createSlice({
  name: 'decks',
  initialState,
  reducers: {
    reset: (state) => {
      state.decks = [];
      state.selectedDeck = null;
      state.loading = false;
      state.error = null;
      state.pagination = {
        totalPages: 0,
        totalElements: 0,
        pageNumber: 0
      };
    },
    setSelectedDeck: (state, action) => {
      state.selectedDeck = action.payload;
    },
    clearDeckError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase('decks/fetchAll/pending', (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase('decks/fetchAll/fulfilled', (state, action) => {
        state.loading = false;
        state.error = null;
        const payload = action.payload;
        if (Array.isArray(payload)) {
          state.decks = payload;
        } else if (payload && Array.isArray(payload.content)) {
          state.decks = payload.content;
          state.pagination = {
            totalPages: payload.totalPages || 1,
            totalElements: payload.totalElements || payload.content.length,
            pageNumber: payload.number || 0
          };
        } else if (payload && Array.isArray(payload.decks)) {
          state.decks = payload.decks;
        } else {
          state.decks = [];
        }
      })
      .addCase('decks/fetchAll/rejected', (state, action) => {
        state.loading = false;
        state.error = action.payload || (action.error && action.error.message) || 'Failed to fetch decks';
      })
      .addCase(createDeck.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createDeck.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        if (action.payload && typeof action.payload === 'object' && action.payload.id) {
          state.decks.push(action.payload);
        }
      })
      .addCase(createDeck.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || (action.error && action.error.message) || 'Failed to create deck';
      })
      .addCase(updateDeck.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateDeck.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        const { id, data } = action.payload || {};
        if (id && data && typeof data === 'object') {
          const index = state.decks.findIndex((d) => d.id === id);
          if (index !== -1) {
            state.decks[index] = { ...state.decks[index], ...data };
          }
        }
      })
      .addCase(updateDeck.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || (action.error && action.error.message) || 'Failed to update deck';
      })
      .addCase(deleteDeck.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteDeck.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        const id = action.payload ? action.payload.id : null;
        if (id !== null) {
          state.decks = state.decks.filter((deck) => deck.id !== id);
        }
      })
      .addCase(deleteDeck.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || (action.error && action.error.message) || 'Failed to delete deck';
      });
  }
});

export const { reset, setSelectedDeck, clearDeckError } = deckSlice.actions;
export default deckSlice.reducer;
