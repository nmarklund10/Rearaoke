import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import UploadButtons from './UploadButtons';
import AudioProgress from './AudioProgress';
import { Grid } from '@material-ui/core'


const useStyles = makeStyles(() => ({
}));

export default function AudioControls() {
  const classes = useStyles();

  return (
    <Grid container direction='row' wrap='nowrap' spacing={2}>
      <Grid item>
        <UploadButtons/>
      </Grid>
      <Grid item>
        <AudioProgress/>
      </Grid>
    </Grid>
  );
}