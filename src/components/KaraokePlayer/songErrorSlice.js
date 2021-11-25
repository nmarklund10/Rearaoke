import { createSlice } from '@reduxjs/toolkit';

export const songErrorSlice = createSlice({
  name: 'songError',
  initialState: {
    value: null,
  },
  reducers: {
    setSongError: (state, action) => {
      return {
        ...state,
        value: action.payload
      }
    },
  },
})

// Action creators are generated for each case reducer function
export const { setSongError } = songErrorSlice.actions

export default songErrorSlice.reducer