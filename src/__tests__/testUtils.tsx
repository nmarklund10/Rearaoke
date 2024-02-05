import { ReactElement, PropsWithChildren } from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';

import { rearaokeStore } from '../store/store';
import { UploadErrorState, SongState } from '../store/store.type';
import { mockStoreState } from './mocks/mockStore';

export const renderWithProviders = (
  ui: ReactElement,
  defaultStateSongOverrides: Partial<SongState['value']> = {},
  defaultUploadErrorSongOverrides: Partial<UploadErrorState> = {}
) => {
  const store = rearaokeStore({
    song: {
      value: {
        ...mockStoreState.song.value,
        ...defaultStateSongOverrides
      }
    },
    uploadError: {
      ...mockStoreState.uploadError,
      ...defaultUploadErrorSongOverrides
    }
  });
  // eslint-disable-next-line @typescript-eslint/ban-types
  function Wrapper({ children }: PropsWithChildren<{}>): JSX.Element {
    return <Provider store={store}>{children}</Provider>;
  }

  // Return an object with the store and all of RTL's query functions
  return { store, ...render(ui, { wrapper: Wrapper }) };
};
