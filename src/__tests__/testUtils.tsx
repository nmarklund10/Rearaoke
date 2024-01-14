import { ReactElement, PropsWithChildren } from 'react';
import { render } from '@testing-library/react';
import { RenderOptions } from '@testing-library/react';
import { Provider } from 'react-redux';

import { rearaokeStore } from '../store/store';
import { RearaokeStore, RearaokeState } from '../store/store.type';
import { mockStoreState } from './mocks/mockStore';

// This type interface extends the default options for render from RTL, as well
// as allows the user to specify other things such as initialState, store.
interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: Partial<RearaokeState>
  store?: RearaokeStore
}

export const renderWithProviders = (
  ui: ReactElement,
  {
    // Automatically create a store instance if no store was passed in
    store = rearaokeStore(mockStoreState),
    ...renderOptions
  }: ExtendedRenderOptions = {}
) => {
  // eslint-disable-next-line @typescript-eslint/ban-types
  function Wrapper({ children }: PropsWithChildren<{}>): JSX.Element {
    return <Provider store={store}>{children}</Provider>;
  }

  // Return an object with the store and all of RTL's query functions
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
};
