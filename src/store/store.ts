import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { songReducer } from './songSlice';
import { uploadErrorReducer } from './uploadErrorSlice';

export const rearaokeReducers = combineReducers({
  song: songReducer,
  uploadError: uploadErrorReducer
});

export const rearaokeStore = (preloadedState?: Partial<ReturnType<typeof rearaokeReducers>>) => {
  return configureStore({
    reducer: rearaokeReducers,
    preloadedState
  });
};
