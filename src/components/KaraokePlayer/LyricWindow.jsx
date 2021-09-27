import React from 'react';
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
  }
}));

export default function AudioProgress() {
  const classes = useStyles();

  return (
    <Grid className={classes.karaokeLyricWindow}>
      <Typography className={classes.karaokeLine} variant='h6'>
        No lyrics to display.
      </Typography>
      <Typography className={classes.karaokeLine} variant='h6'>
        Upload an LRC file and audio file to get started.
      </Typography>
    </Grid>
  );
}