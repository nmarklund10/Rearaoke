import { useSelector } from 'react-redux';
import { Grid, Typography, Box } from '@mui/material';

const classes = {
  karaokeLyricWindow: {
    height: '100%',
    margin: (theme) => theme.spacing(1),
    backgroundColor: (theme) => theme.palette.secondary.main,
  },
  karaokeLine: {
    padding: (theme) => theme.spacing(1),
    fontSize: '1.25rem'
  },
  karaokePos: {
    color: 'rgb(221, 190, 11)'
  },
  upcoming: {

  }
};

export default function LyricWindow() {
  const MAX_LINES = 4;
  const PLACEHOLDER = {start: -1, end: -1};
  const songKaraoke = useSelector((state) => state.song.value.karaoke);
  const currentTime = useSelector((state) => state.song.value.currentTime);
  let lyricWindowContent = [{...PLACEHOLDER, index: -1, lyric: 'No lyrics to display'},
                            {...PLACEHOLDER, index: -2, lyric: 'Upload an LRC file and audio file to get started'}];


  if (songKaraoke !== null && currentTime === 0) {
    const initialSlice = Math.min(songKaraoke.length, MAX_LINES);
    lyricWindowContent = songKaraoke.slice(0, initialSlice).map((lyricLine) => {
      return lyricLine;
    });
  }

  return (
    <Grid sx={classes.karaokeLyricWindow}>
      {lyricWindowContent.map((lyricLine) => {
        return (
          <Typography key={lyricLine.index} sx={classes.karaokeLine} variant='body1'>
            <Box component='span' sx={classes.karaokePos}/>
            <Box component='span' className={classes.upcoming}>{lyricLine.lyric}</Box>
          </Typography>
        )})}
    </Grid>
  );
}