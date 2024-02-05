import { useState, useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Grid, Typography, Box, Checkbox, FormControlLabel, Theme } from '@mui/material';
import { RearaokeState } from '../../store/store.type';
import { UNINIT_STR } from '../../store/constants';

const classes = {
  karaokeLyricWindow: {
    height: '100%',
    minHeight: '5em',
    margin: (theme: Theme) => theme.spacing(1),
    backgroundColor: (theme: Theme) => theme.palette.secondary.main
  },
  karaokeLine: {
    padding: (theme: Theme) => theme.spacing(1),
    minHeight: '1rem'
  },
  animatedLine: {
    fontWeight: 'bold'
  },
  karaokePos: {
    color: (theme: Theme) => theme.palette.primary.main
  },
  unAnimatedLine: {
    fontSize: '1.25rem'
  }
};

export const LyricWindow = () => {
  const MAX_LINES = 4;
  const START_ANIMATION_TIME = 0.25;
  const karaoke = useSelector((state: RearaokeState) => state.song.value.karaoke);
  const src = useSelector((state: RearaokeState) => state.song.value.src);
  const currentTime = useSelector((state: RearaokeState) => state.song.value.currentTime);
  const [showCheckbox, setShowCheckbox] = useState(false);
  const [showLineProgress, setShowLineProgress] = useState(true);
  const [nextKaraokeIndex, setNextKaraokeIndex] = useState(0);
  const [letterIndex, setLetterIndex] = useState(0);
  const [lineIsAnimating, setLineIsAnimating] = useState(false);
  const DEFAULT_LYRIC_CONTENT = useMemo(() => {
    const PLACEHOLDER = { start: -1, end: -1 };
    return [{ ...PLACEHOLDER, lyric: 'No lyrics to display' },
      { ...PLACEHOLDER, lyric: 'Upload an LRC file and audio file to get started' }];
  }, []);
  const [lyricWindowContent, setLyricWindowContent] = useState(DEFAULT_LYRIC_CONTENT);

  useEffect(() => {
    // define in here to prevent re renders
    const updateLetterIndex = (letters: number[]) => {
      let currentLetterIndex = letterIndex;
      if (showLineProgress) {
        let letterTime = letters[currentLetterIndex];
        while (letterTime - currentTime <= START_ANIMATION_TIME) {
          currentLetterIndex += 1;
          letterTime = letters[currentLetterIndex];
        }
      }
      else {
        currentLetterIndex = letters.length;
      }
      setLetterIndex(currentLetterIndex);
    };

    if (currentTime === 0) {
      setNextKaraokeIndex(0);
      setLetterIndex(0);
      setLineIsAnimating(false);
    }
    else if (karaoke.length > 0 && nextKaraokeIndex !== null &&
             nextKaraokeIndex < karaoke.length) {
      const nextKaraokeLine = karaoke[nextKaraokeIndex];
      if (nextKaraokeLine.start - currentTime <= START_ANIMATION_TIME) {
        setLineIsAnimating(true);
        updateLetterIndex(nextKaraokeLine.letters);
      }
      if (nextKaraokeLine.end - currentTime < 0) {
        setNextKaraokeIndex(nextKaraokeIndex + 1);
        setLetterIndex(0);
        setLineIsAnimating(false);
      }
    }
  }, [currentTime, nextKaraokeIndex, karaoke, lineIsAnimating, letterIndex, showLineProgress]);

  useEffect(() => {
    if (karaoke.length > 0 && src !== UNINIT_STR) {
      // check if remaining number of karaoke lines is less than MAX_LINES
      const endSlice = nextKaraokeIndex + Math.min(karaoke.length - nextKaraokeIndex, MAX_LINES);
      setLyricWindowContent(karaoke.slice(nextKaraokeIndex, endSlice));
      setShowCheckbox(true);
    }
    else {
      setLyricWindowContent(DEFAULT_LYRIC_CONTENT);
      setShowCheckbox(false);
    }
  }, [karaoke, src, nextKaraokeIndex, DEFAULT_LYRIC_CONTENT]);

  const animatedLine = (lyric: string, index: number) => {
    const highlightedText = lyric.slice(0, letterIndex);
    const unHighlightedText = lyric.slice(letterIndex);
    return (
      <Typography key={index} sx={classes.karaokeLine} variant={'h5'}>
        <Box component='div' sx={classes.animatedLine}>
          <Box component='span' data-testid='highlighted' sx={classes.karaokePos}>
            {highlightedText}
          </Box>
          <Box component='span' data-testid='unhighlighted'>{unHighlightedText}</Box>
        </Box>
      </Typography>
    );
  };

  const unAnimatedLine = (lyric: string, index: number) => {
    return (
      <Typography key={index} sx={classes.karaokeLine} variant={'body1'}>
        <Box component='span' sx={classes.unAnimatedLine}>{lyric}</Box>
      </Typography>
    );
  };

  const toggleShowLineProgress = () => {
    const newShowLineProgress = !showLineProgress;
    if (newShowLineProgress) {
      setLetterIndex(0);
    }

    setShowLineProgress(newShowLineProgress);
  };

  return (
    <>
      <FormControlLabel
        label='Show line progress'
        control={<Checkbox checked={showLineProgress} onClick={toggleShowLineProgress}/>}
        sx={{ display: showCheckbox ? 'visible' : 'none' }}
      />
      <Grid sx={classes.karaokeLyricWindow}>
        {lyricWindowContent.map((lyricLine, index) => {
          return (lineIsAnimating && index === 0) ?
            animatedLine(lyricLine.lyric, index) :
            unAnimatedLine(lyricLine.lyric, index);
        })}
      </Grid>
    </>
  );
};
