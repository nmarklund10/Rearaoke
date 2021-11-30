import { Paper, Grid, Card, CardContent, Typography, } from '@mui/material';
import NowPlaying from './NowPlaying';
import UploadError from './UploadError';
import AudioProgress from './AudioProgress';
import LyricWindow from './LyricWindow';
import UploadButtons from './UploadButtons/UploadButtons';
import Audio from './Audio';

const classes = {
  karaokeContainer: {
    height: '100%'
  },
  karaokeHolder: {
    zIndex: '10',
  },
  paddedHeader: {
    paddingTop: (theme) => theme.spacing(2),
    paddingBottom: (theme) => theme.spacing(2)
  }
};

export default function KaraokeHolder() {
  return (
    <>
      <Grid sx={classes.karaokeContainer} container direction='column'
            alignItems='center' justifyContent='center'>
        <Grid item>
          <Paper variant='outlined' sx={classes.karaokeHolder}>
            <Card>
              <CardContent>
                <Typography variant='h3' align='center'>Rearaoke</Typography>
                <Typography variant='h4' sx={classes.paddedHeader}>Audio Control</Typography>
                <UploadError />
                <Grid container direction='row' wrap='nowrap' spacing={2}>
                  <Grid item>
                    <Audio/>
                    <UploadButtons/>
                  </Grid>
                  <Grid item>
                    <AudioProgress/>
                  </Grid>
                </Grid>
                <Typography variant='h4' sx={classes.paddedHeader}>Lyric Window</Typography>
                <NowPlaying/>
                <LyricWindow/>
              </CardContent>
            </Card>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
}