import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { LinearProgress } from '@material-ui/core';

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

  return (
    <>
      <LinearProgress className={classes.audioProgress} variant="determinate" value={100}/>
      <div className={classes.progressText}>
        <span>.. / ..</span>
        <span className={classes.audioFileName}>No song loaded</span>
      </div>
    </>
  );
}
