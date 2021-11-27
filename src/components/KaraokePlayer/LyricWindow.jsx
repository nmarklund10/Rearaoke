import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  karaokeLyricWindow: {
    height: '100%',
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  karaokeLine: {
    padding: theme.spacing(1),
    fontSize: '1.25rem'
  },
  karaokePos: {
    color: 'rgb(221, 190, 11)'
  }
}));

export default function LyricWindow() {
  const MAX_LINES = 4;
  const PLACEHOLDER = {start: -1, end: -1};
  const classes = useStyles();
  const songKaraoke = useSelector((state) => state.song.value.karaoke);
  const songCurrentTime = useSelector((state) => state.song.value.currentTime);
  let lyricWindowContent = [{...PLACEHOLDER, index: -1, lyric: 'No lyrics to display'},
                            {...PLACEHOLDER, index: -2, lyric: 'Upload an LRC file and audio file to get started'}];


  if (songKaraoke !== null && songCurrentTime === 0) {
    const initialSlice = Math.min(songKaraoke.length, MAX_LINES);
    lyricWindowContent = songKaraoke.slice(0, initialSlice).map((lyricLine) => {
      return lyricLine;
    });
  }

  return (
    <Grid className={classes.karaokeLyricWindow}>
      {lyricWindowContent.map((lyricLine) => {
        return (
          <Typography key={lyricLine.index} className={classes.karaokeLine} variant='body1'>
            <span className={classes.karaokePos}/><span className='upcoming'>{lyricLine.lyric}</span>
          </Typography>
        )})}
    </Grid>
  );
}