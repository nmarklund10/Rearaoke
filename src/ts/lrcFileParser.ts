import { Karaoke, ParsedLrcFile, ParsedLrcLine, ParsedLyricLine } from './lrcFile.types';
import { stringToSeconds } from './time';

// how long to define a break in a song to display on the karaoke lyrics
const BREAK_TIME = 4;
const BREAK_TEXT = '....';
const BREAK_PAD_SECS = 1;
const END_PLACEHOLDER = 0;
const PLACEHOLDER_LINE = {
  start: -1,
  end: END_PLACEHOLDER,
  lyric: '',
  letters: []
};

export const parseLrcFile = (fileData: string | ArrayBuffer | null | undefined) => {
  if (fileData == null) {
    throw new Error('file data is null');
  }
  if (fileData instanceof ArrayBuffer) {
    fileData = new TextDecoder().decode(fileData);
  }
  const fileLines = fileData.replace('\r', '').split('\n');
  const parsedLrcFile: ParsedLrcFile = {
    title: '',
    artist: '',
    karaoke: [],
    changeEnd: false
  };

  for (const line of fileLines) {
    const trimmedLine = line.trim();
    if (trimmedLine.length > 0) {
      const lrcLine = parseLrcLine(trimmedLine);
      if (lrcLine !== null){
        if ('artist' in lrcLine) {
          parsedLrcFile.artist = lrcLine.artist;
        }
        else if ('title' in lrcLine) {
          parsedLrcFile.title = lrcLine.title;
        }
        else {
          addLyricLine(parsedLrcFile.karaoke, lrcLine);
        }
      }
    }
  }

  parsedLrcFile.changeEnd = parsedLrcFile.karaoke[parsedLrcFile.karaoke.length - 1].end === 0;
  return parsedLrcFile;
};

const parseLrcLine = (line: string): ParsedLrcLine | null => {
  const bracketRegex = /\[[^\]]*\]/g;

  const bracketMatches = line.match(bracketRegex);
  if (bracketMatches != null && bracketMatches.length > 0) {
    const bracketMatch = bracketMatches[0];
    if (bracketMatch.indexOf(bracketMatch) !== 0) {
      throw new Error(`First bracket text not at beginning of line: ${line}`);
    }

    // -2 to account for both brackets
    const textInsideBrackets = bracketMatch.substr(1, bracketMatch.length - 2);

    let colonIndex;
    if (isTimeStamp(textInsideBrackets)) {
      return parseLyricLine(line, textInsideBrackets);
    }
    else if ((colonIndex = textInsideBrackets.indexOf(':')) !== -1) {
      return parseMetaLine(textInsideBrackets, colonIndex);
    }
  }
  throw new Error(`Line found without bracket text: ${line}`);
};

const parseLyricLine = (line: string, textInsideBrackets: string) => {
  const lyric = line.substr(line.indexOf(']') + 1);
  const timestamp = stringToSeconds(textInsideBrackets);
  return {
    time: timestamp,
    lyric: lyric
  };
};

const parseMetaLine = (textInsideBrackets: string, colonIndex: number): ParsedLrcLine | null => {
  const [field, text] = [textInsideBrackets.slice(0, colonIndex),
    textInsideBrackets.slice(colonIndex + 1).trim()];
  switch(field) {
  case 'ar':
    return {artist: text};
  case 'ti':
    return {title: text};
  default:
    return null;
  }
};

const isTimeStamp = (text: string) => {
  const timestampRegex = /\d\d:\d\d\.\d\d/;
  const timestampMatch = text.match(timestampRegex);
  if (timestampMatch) {
    if (timestampMatch[0] === text) {
      return true;
    }
  }
  return false;
};

const addLyricLine = (karaoke: Karaoke, lrcLine: ParsedLyricLine) => {
  const numLyrics = karaoke.length;
  const lastKarokeIndex = numLyrics - 1;
  const previousLyric = (numLyrics === 0) ? PLACEHOLDER_LINE : karaoke[lastKarokeIndex];

  if (karaoke.length !== 0) {
    previousLyric.end = lrcLine.time;
    if (previousLyric.end <= previousLyric.start) {
      throw new Error(`LRC times not properly sorted at line ${numLyrics}`);
    }
    previousLyric.letters = calculateLetterTimes(previousLyric.start, previousLyric.lyric, previousLyric.end);
  }
  if (lrcLine.lyric !== '') {
    if ((lrcLine.time - previousLyric.end) >= BREAK_TIME) {
      const start = previousLyric.end + BREAK_PAD_SECS;
      const end = lrcLine.time - BREAK_PAD_SECS;
      karaoke.push({
        start: start,
        lyric: BREAK_TEXT,
        end: end,
        letters: calculateLetterTimes(start, BREAK_TEXT, end)
      });
    }
    karaoke.push({
      start: lrcLine.time,
      lyric: lrcLine.lyric,
      end: END_PLACEHOLDER,
      letters: []
    });
  }
};

export const calculateLetterTimes = (start: number, lyric: string, end: number) => {
  const timeInterval = (end - start) / lyric.length;
  return lyric.split('').map((_: string, index: number) => start + (timeInterval * index));
};
