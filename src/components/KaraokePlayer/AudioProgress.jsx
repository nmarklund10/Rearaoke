import { useSelector } from 'react-redux';
import { LinearProgress, Box } from '@mui/material';
import { secondsToString } from '../../js/time';

const classes = {
  audioProgress: {
    color: (theme) => theme.palette.primary.main,
    width: '40vw',
    height: (theme) =>theme.spacing(1),
    borderRadius: (theme) => theme.spacing(3),
    cursor: 'pointer'
  },
  audioFileStatus: {
    float: 'right'
  },
  progressText: {
    paddingTop: (theme) => theme.spacing(1)
  }
};

export default function AudioProgress() {
  const song = useSelector((state) => state.song.value);
  const seekValue = song.seekValue === null ? 0 : song.seekValue;
  const currentTime = song.currentTime === null ? '..' : secondsToString(song.currentTime);
  const totalTime = song.duration === null ? '..' : secondsToString(song.duration);
  const resetAudioFileleStatus = song.src === null ? 'No song loaded' : '';

  return (
    <>
      <LinearProgress sx={classes.audioProgress} variant="determinate" value={seekValue}/>
      <Box component='div' sx={classes.progressText}>
        <span>{currentTime} / {totalTime}</span>
        <Box component='span' sx={classes.audioFileStatus}>{resetAudioFileleStatus}</Box>
      </Box>
    </>
  );
}
