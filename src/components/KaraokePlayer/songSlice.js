import { createSlice } from '@reduxjs/toolkit';

export const songSlice = createSlice({
  name: 'song',
  initialState: {
    value: null,
  },
  reducers: {
    setSong: (state, action) => {
      return {
        ...state,
        value: action.payload
      }
    },
  },
})

// Action creators are generated for each case reducer function
export const { setSong } = songSlice.actions

export default songSlice.reducer