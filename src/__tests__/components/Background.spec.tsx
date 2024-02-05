import { Background } from '../../components/Background';
import { renderWithProviders } from '../testUtils';

describe('Background tests', () => {
  test('check background renders', () => {
    const { getByTestId } = renderWithProviders(<Background/>);
    expect(getByTestId('bg')).toBeDefined();
  });
});
