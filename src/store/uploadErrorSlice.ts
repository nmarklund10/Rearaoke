import { createSlice } from '@reduxjs/toolkit';
import { UploadErrorState } from './store.type';

export const uploadErrorSlice = createSlice({
  name: 'uploadError',
  initialState: {
    value: null
  } as UploadErrorState,
  reducers: {
    setUploadError: (state, action) => {
      return {
        ...state,
        value: action.payload
      };
    }
  }
});

// Action creators are generated for each case reducer function
export const { setUploadError } = uploadErrorSlice.actions;

export const uploadErrorReducer = uploadErrorSlice.reducer;
