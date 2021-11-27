import { createSlice } from '@reduxjs/toolkit';

export const songSlice = createSlice({
  name: 'song',
  initialState: {
    value: {
      title: null,
      artist: null,
      karaoke: null,
      src: null,
      seekValue: null,
      currentTime: null,
      duration: null
    },
  },
  reducers: {
    setSong: (state, action) => {
      return {
        ...state,
        value: {
          ...state.value,
          ...action.payload
        }
      }
    },
    setSongSrc: (state, action) => {
      return {
        ...state,
        value: {
          ...state.value,
          src: action.payload
        }
      }
    },
    setSongDuration: (state, action) => {
      return {
        ...state,
        value: {
          ...state.value,
          duration: action.payload
        }
      }
    },
    setSongCurrentTime: (state, action) => {
      return {
        ...state,
        value: {
          ...state.value,
          currentTime: action.payload
        }
      }
    },
    setSongSeekValue: (state, action) => {
      return {
        ...state,
        value: {
          ...state.value,
          seekValue: action.payload
        }
      }
    }
  },
})

// Action creators are generated for each case reducer function
export const { setSong, setSongSrc, setSongDuration,
               setSongCurrentTime, setSongSeekValue } = songSlice.actions

export default songSlice.reducer