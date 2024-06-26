import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import {
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
} from './songSlice';


const API_BASE_URL = 'https://song-app.biruklemma.com';

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

function* fetchSongs() {
  try {
    const response = yield call(axiosInstance.get, `${API_BASE_URL}/api/songs`);
    yield put(fetchSongsSuccess(response.data));
  } catch (error) {
    yield put(fetchSongsFailure(error.message));
  }
}

function* uploadSong(action) {
  try {
    const formData = new FormData();
    formData.append('title', action.payload.title);
    formData.append('file', action.payload.file);

    const response = yield call(axiosInstance.post, '/api/songs', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    yield put(uploadSongSuccess(response.data));
  } catch (error) {
    console.error('Upload song error:', error);
    yield put(uploadSongFailure(error.message));
  }
}

function* updateSong(action) {
  try {
    const formData = new FormData();
    if (action.payload.title) {
      formData.append('title', action.payload.title);
    }

    if (action.payload.file) {
      formData.append('file', action.payload.file);
    }

    const response = yield call(axiosInstance.put, `/api/songs/${action.payload.id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    yield put(updateSongSuccess(response.data));
  } catch (error) {
    console.error('Update song error:', error);
    yield put(updateSongFailure(error.message));
  }
}

function* deleteSong(action) {
  try {
    yield call(axiosInstance.delete, `${API_BASE_URL}/api/songs/${action.payload}`);
    yield put(deleteSongSuccess(action.payload));
  } catch (error) {
    console.error('Delete song error:', error);
    yield put(deleteSongFailure(error.message));
  }
}

function* clearSongs() {
  try {
    yield call(axiosInstance.delete, '/api/songs');
    yield put(clearSongsSuccess());
  } catch (error) {
    console.error('Clear songs error:', error);
    yield put(clearSongsFailure(error.message));
  }
}

function* songSaga() {
  yield takeLatest(fetchSongsRequest.type, fetchSongs);
  yield takeLatest(uploadSongRequest.type, uploadSong);
  yield takeLatest(updateSongRequest.type, updateSong);
  yield takeLatest(deleteSongRequest.type, deleteSong);
  yield takeLatest(clearSongsRequest.type, clearSongs);
}

export default songSaga;