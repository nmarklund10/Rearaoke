import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { LinearProgress } from '@material-ui/core';
import { secondsToString } from '../../js/time';

const useStyles = makeStyles((theme) => ({
  audioProgress: {
    color: theme.palette.primary.main,
    width: '40vw',
    height: theme.spacing(1),
    borderRadius: theme.spacing(3),
    cursor: 'pointer'
  },
  audioFileStatus: {
    float: 'right'
  },
  progressText: {
    paddingTop: theme.spacing(1)
  }
}));

export default function AudioProgress() {
  const classes = useStyles();
  const song = useSelector((state) => state.song.value);
  const seekValue = song.seekValue === null ? 0 : song.seekValue;
  const currentTime = song.currentTime === null ? '..' : secondsToString(song.currentTime);
  const totalTime = song.duration === null ? '..' : secondsToString(song.duration);
  const resetAudioFileleStatus = song.src === null ? 'No song loaded' : '';

  return (
    <>
      <LinearProgress className={classes.audioProgress} variant="determinate" value={seekValue}/>
      <div className={classes.progressText}>
        <span>{currentTime} / {totalTime}</span>
        <span className={classes.audioFileStatus}>{resetAudioFileleStatus}</span>
      </div>
    </>
  );
}
