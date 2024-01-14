import { createSlice } from '@reduxjs/toolkit';
import { SongState } from './store.type';
import { UNINIT_NUM, UNINIT_STR } from './constants';

const initialState: SongState = {
  value: {
    title: UNINIT_STR,
    artist: UNINIT_STR,
    karaoke: [],
    src: UNINIT_STR,
    seekValue: UNINIT_NUM,
    currentTime: UNINIT_NUM,
    duration: UNINIT_NUM,
    songPlaying: null,
    volume: UNINIT_NUM,
    changeEnd: true
  }
};

export const songSlice = createSlice({
  name: 'song',
  initialState: initialState,
  reducers: {
    setSong: (state, action) => {
      return {
        ...state,
        value: {
          ...state.value,
          ...action.payload
        }
      };
    },
    setSongSrc: (state, action) => {
      return {
        ...state,
        value: {
          ...state.value,
          src: action.payload
        }
      };
    },
    setSongDuration: (state, action) => {
      return {
        ...state,
        value: {
          ...state.value,
          duration: action.payload
        }
      };
    },
    setSongCurrentTime: (state, action) => {
      return {
        ...state,
        value: {
          ...state.value,
          currentTime: action.payload
        }
      };
    },
    setSongSeekValue: (state, action) => {
      return {
        ...state,
        value: {
          ...state.value,
          seekValue: action.payload
        }
      };
    },
    setSongPlaying: (state, action) => {
      return {
        ...state,
        value: {
          ...state.value,
          songPlaying: action.payload
        }
      };
    },
    setSongVolume: (state, action) => {
      return {
        ...state,
        value: {
          ...state.value,
          volume: action.payload
        }
      };
    },
    setSongKaraoke: (state, action) => {
      return {
        ...state,
        value: {
          ...state.value,
          karaoke: action.payload
        }
      };
    },
    resetAudioValues: (state) => {
      return {
        ...state,
        value: {
          ...initialState.value,
          title: state.value.title,
          artist: state.value.artist,
          karaoke: state.value.karaoke,
          src: state.value.src
        }
      };
    },
    initializeAudioValues: (state) => {
      return {
        ...state,
        value: {
          ...state.value,
          currentTime: 0,
          volume: 1
        }
      };
    },
    resetSong: (state) => {
      return {
        ...state,
        value: {
          ...initialState.value
        }
      };
    }
  }
});

// Action creators are generated for each case reducer function
export const { setSong, setSongSrc, setSongDuration, setSongCurrentTime,
  setSongSeekValue, setSongPlaying, resetAudioValues,
  setSongVolume, resetSong, initializeAudioValues,
  setSongKaraoke } = songSlice.actions;

export const songReducer = songSlice.reducer;
