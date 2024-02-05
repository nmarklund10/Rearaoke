import { fireEvent } from '@testing-library/react';
import { LyricWindow } from '../../../components/KaraokePlayer/LyricWindow';
import { renderWithProviders } from '../../testUtils';

describe('LyricWindow tests', () => {
  test('lyric window displays unanimated lyrics properly', () => {
    const { getByText, queryByTestId  } = renderWithProviders(<LyricWindow/>);
    expect(getByText('....')).toBeDefined();
    expect(getByText('I took an arrow to the heart')).toBeDefined();
    expect(getByText('I never kissed a mouth that tastes like yours')).toBeDefined();
    expect(getByText('Strawberries and somethin more')).toBeDefined();
    expect(queryByTestId('highlighted')).toBeNull();
  });

  test('lyric window displays animated lyrics properly with show line progress enabled', () => {
    const { getByTestId } = renderWithProviders(<LyricWindow/>, { currentTime: 1 });
    const highlightedText = getByTestId('highlighted');
    const unhighlightedText = getByTestId('unhighlighted');
    expect(highlightedText.textContent?.length).toBe(1);
    expect(unhighlightedText.textContent?.length).toBe(3);
  });

  test('lyric window displays animated lyrics properly with show line progress disabled', () => {
    const { getByTestId, getByLabelText } = renderWithProviders(<LyricWindow/>, { currentTime: 1 });
    fireEvent.click(getByLabelText('Show line progress'));
    const highlightedText = getByTestId('highlighted');
    const unhighlightedText = getByTestId('unhighlighted');
    expect(highlightedText.textContent?.length).toBe(4);
    expect(unhighlightedText.textContent?.length).toBe(0);
  });

  test('lyric window is able to switch between show line progress enabled and disabled', () => {
    const { getByTestId, getByLabelText } = renderWithProviders(<LyricWindow/>, { currentTime: 1 });
    fireEvent.click(getByLabelText('Show line progress'));
    let highlightedText = getByTestId('highlighted');
    let unhighlightedText = getByTestId('unhighlighted');
    expect(highlightedText.textContent?.length).toBe(4);
    expect(unhighlightedText.textContent?.length).toBe(0);
    fireEvent.click(getByLabelText('Show line progress'));
    highlightedText = getByTestId('highlighted');
    unhighlightedText = getByTestId('unhighlighted');
    expect(highlightedText.textContent?.length).toBe(1);
    expect(unhighlightedText.textContent?.length).toBe(3);
  });

  test('lyric window moves to next line when current line time expires', () => {
    const { getByTestId } = renderWithProviders(<LyricWindow/>, { currentTime: 12.5 });
    const highlightedText = getByTestId('highlighted');
    const unhighlightedText = getByTestId('unhighlighted');
    expect(highlightedText.textContent).toEqual('I took');
    expect(unhighlightedText.textContent).toEqual(' an arrow to the heart');
  });

  test('lyric window displays default text when no karaoke is loaded', () => {
    const { getByText } = renderWithProviders(<LyricWindow/>, { karaoke: [] });
    expect(getByText('No lyrics to display')).toBeDefined();
    expect(getByText('Upload an LRC file and audio file to get started')).toBeDefined();
  });
});
