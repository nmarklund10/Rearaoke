import { LyricWindow } from '../../../components/KaraokePlayer/LyricWindow';
import { renderWithProviders } from '../../testUtils';

test('check lyric window displays lyrics properly', () => {
  const { getByText } = renderWithProviders(<LyricWindow />);
  expect(getByText('....')).toBeDefined();
  expect(getByText('I took an arrow to the heart')).toBeDefined();
  expect(getByText('I never kissed a mouth that tastes like yours')).toBeDefined();
  expect(getByText('Strawberries and somethin more')).toBeDefined();
});
