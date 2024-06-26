import { createSlice } from '@reduxjs/toolkit';

const songSlice = createSlice({
  name: 'songs',
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {
    fetchSongsRequest: (state) => {
      state.loading = true;
    },
    fetchSongsSuccess: (state, action) => {
      state.loading = false;
      state.list = action.payload;
    },
    fetchSongsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    uploadSongRequest: (state) => {
      state.loading = true;
    },
    uploadSongSuccess: (state, action) => {
      state.loading = false;
      state.list.push(action.payload);
    },
    uploadSongFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateSongRequest: (state) => {
      state.loading = true;
    },
    updateSongSuccess: (state, action) => {
      state.loading = false;
      const index = state.list.findIndex(song => song.id === action.payload.id);
      if (index !== -1) {
        state.list[index] = action.payload;
      }
    },
    updateSongFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteSongRequest: (state) => {
      state.loading = true;
    },
    deleteSongSuccess: (state, action) => {
      state.loading = false;
      state.list = state.list.filter(song => song.id !== action.payload);
    },
    deleteSongFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearSongsRequest: (state) => {
      state.loading = true;
    },
    clearSongsSuccess: (state) => {
      state.loading = false;
      state.list = [];
    },
    clearSongsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchSongsRequest,
  fetchSongsSuccess,
  fetchSongsFailure,
  uploadSongRequest,
  uploadSongSuccess,
  uploadSongFailure,
  updateSongRequest,
  updateSongSuccess,
  updateSongFailure,
  deleteSongRequest,
  deleteSongSuccess,
  deleteSongFailure,
  clearSongsRequest,
  clearSongsSuccess,
  clearSongsFailure,
} = songSlice.actions;

export default songSlice.reducer;
