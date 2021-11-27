import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { LinearProgress } from '@material-ui/core';
import { secondsToString } from '../../js/time';

const useStyles = makeStyles((theme) => ({
  audioProgress: {
    backgroundColor: theme.palette.primary.main,
    width: '40vw',
    height: theme.spacing(1),
    borderRadius: theme.spacing(3),
  },
  audioFileName: {
    float: 'right'
  },
  progressText: {
    paddingTop: theme.spacing(1)
  }
}));

export default function AudioProgress() {
  const classes = useStyles();
  const song = useSelector((state) => state.song.value);
  const currentTime = song.currentTime === null ? '..' : secondsToString(song.currentTime);
  const totalTime = song.duration === null ? '..' : secondsToString(song.duration);
  const songName = song.src === null ? 'No song loaded' : '';

  return (
    <>
      <LinearProgress className={classes.audioProgress} variant="determinate" value={100}/>
      <div className={classes.progressText}>
        <span>{currentTime} / {totalTime}</span>
        <span className={classes.audioFileName}>{songName}</span>
      </div>
    </>
  );
}
