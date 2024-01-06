import { configureStore } from '@reduxjs/toolkit';
import songReducer from './songSlice';
import uploadErrorReducer from './uploadErrorSlice';

export default configureStore({
  reducer: {
    song: songReducer,
    uploadError: uploadErrorReducer
  },
});