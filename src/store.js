import { configureStore } from '@reduxjs/toolkit';
import songReducer from './components/KaraokePlayer/songSlice';
import songErrorReducer from './components/KaraokePlayer/songErrorSlice';



export default configureStore({
  reducer: {
    song: songReducer,
    songError: songErrorReducer
  },
})