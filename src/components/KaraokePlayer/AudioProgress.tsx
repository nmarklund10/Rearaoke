import { useSelector } from 'react-redux';
import { LinearProgress, Box, Theme } from '@mui/material';
import { secondsToString } from '../../ts/time';
import { RearaokeState } from '../../store/store.type';
import { UNINIT_NUM, UNINIT_STR } from '../../store/constants';

const classes = {
  audioProgress: {
    color: (theme: Theme) => theme.palette.primary.main,
    width: '40vw',
    height: (theme: Theme) => theme.spacing(1),
    borderRadius: (theme: Theme) => theme.spacing(3)
  },
  audioFileStatus: {
    float: 'right'
  },
  progressText: {
    paddingTop: (theme: Theme) => theme.spacing(1)
  }
};

export const AudioProgress = () => {
  const currentTime = useSelector((state: RearaokeState) => state.song.value.currentTime);
  const duration = useSelector((state: RearaokeState) => state.song.value.duration);
  const src = useSelector((state: RearaokeState) => state.song.value.src);

  const time = currentTime === UNINIT_NUM ? '..' : secondsToString(currentTime);
  const totalTime = duration === UNINIT_NUM ? '..' : secondsToString(duration);
  const resetAudioFileleStatus = src === UNINIT_STR ? 'No song loaded' : '';
  const progress = (duration === UNINIT_NUM || currentTime === UNINIT_NUM) ? 0 : (currentTime / duration) * 100;
  console.log(time);
  return (
    <>
      <LinearProgress sx={classes.audioProgress} variant="determinate" value={progress} />
      <Box component='div' sx={classes.progressText}>
        <span>{time} / {totalTime}</span>
        <Box component='span' sx={classes.audioFileStatus}>{resetAudioFileleStatus}</Box>
      </Box>
    </>
  );
};
