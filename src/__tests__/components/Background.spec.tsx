import { Background } from '../../components/Background';
import { renderWithProviders } from '../testUtils';

test('check background renders', () => {
  const { getByTestId } = renderWithProviders(<Background/>);
  expect(getByTestId('bg')).toBeTruthy();
});
