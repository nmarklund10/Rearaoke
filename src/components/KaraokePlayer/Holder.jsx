import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Grid, Card, CardContent, Typography } from '@material-ui/core';
import AudioControls from './AudioControls';
import "@fontsource/roboto";

const useStyles = makeStyles(() => ({
  karaokeContainer: {
    height: '100%'
  },
  karaokeHolder: {
    zIndex: '10',
  },
}));

export default function Holder() {
  const classes = useStyles();

  return (
    <>
      <Grid className={classes.karaokeContainer} container direction='column'
            alignItems='center' justifyContent='center'>
        <Grid item>
          <Paper variant='outlined' className={classes.karaokeHolder}>
            <Card color='primary'>
              <CardContent>
                <Typography variant='h3' align='center'>Rearaoke</Typography>
                <Typography variant='h4'>Audio Control</Typography>
                <AudioControls/>
                <Typography variant='h4'>Lyric Window</Typography>
              </CardContent>
            </Card>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
}