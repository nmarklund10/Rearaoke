import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Grid, Card, CardContent, Typography } from '@material-ui/core';
import AudioControls from './AudioControls';
import LyricWindow from './LyricWindow';
import "@fontsource/roboto";

const useStyles = makeStyles((theme) => ({
  karaokeContainer: {
    height: '100%'
  },
  karaokeHolder: {
    zIndex: '10',
  },
  paddedHeader: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2)
  }
}));

export default function Holder() {
  const classes = useStyles();

  return (
    <>
      <Grid className={classes.karaokeContainer} container direction='column'
            alignItems='center' justifyContent='center'>
        <Grid item>
          <Paper variant='outlined' className={classes.karaokeHolder}>
            <Card>
              <CardContent>
                <Typography variant='h3' align='center'>Rearaoke</Typography>
                <Typography variant='h4' className={classes.paddedHeader}>Audio Control</Typography>
                <AudioControls/>
                <Typography variant='h4' className={classes.paddedHeader}>Lyric Window</Typography>
                <LyricWindow/>
              </CardContent>
            </Card>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
}