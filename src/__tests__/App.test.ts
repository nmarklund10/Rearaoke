import React from 'react';
import { render } from '@testing-library/react';
import { configureStore } from '@reduxjs/toolkit';
import {LyricWindow} from '../components/KaraokePlayer/LyricWindow';
import {songReducer} from '../components/KaraokePlayer/songSlice';
import { Provider } from 'react-redux';
import { readFileSync } from 'fs';
import testLrc from './shivers.json';

test('check lyric window displays lyrics properly', () => {
  const initialState = testLrc;
  const store = configureStore({
    reducer: {
      song: songReducer
    },
    preloadedState: initialState
  });

  const { getByText } = render(<Provider store={store}><LyricWindow/></Provider>);
  expect(getByText('....')).toBeDefined();
  expect(getByText('I took an arrow to the heart')).toBeDefined();
  expect(getByText('I never kissed a mouth that tastes like yours')).toBeDefined();
  expect(getByText('Strawberries and somethin more')).toBeDefined();
});
