import { configureStore } from '@reduxjs/toolkit';
import songReducer from './components/KaraokePlayer/songSlice';


export default configureStore({
  reducer: {
    song: songReducer,
  },
})