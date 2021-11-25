import { useRef, useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Grid, Card, CardContent, Typography, Collapse, IconButton } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { useSelector, useDispatch } from 'react-redux';
import AudioProgress from './AudioProgress';
import UploadButtons from './UploadButtons';
import LyricWindow from './LyricWindow';
import "@fontsource/roboto";
import { setSongError } from './songErrorSlice';
import CloseIcon from '@material-ui/icons/Close';

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
  },
  alertBox: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1)
  }
}));

export default function Holder() {
  const classes = useStyles();
  const audioRef = useRef();
  const song = useSelector((state) => state.song.value);
  const songError = useSelector((state) => state.songError.value);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(songError !== null);

  useEffect(() => {
    setOpen(songError !== null);
  }, [songError]);

  const onAlertClose = (event) => {
    dispatch(setSongError(null))
    setOpen(false);
  }

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
                <Collapse in={open}>
                  <Alert
                    action={
                      <IconButton
                        aria-label="close"
                        color="inherit"
                        size="small"
                        onClick={onAlertClose}
                      >
                        <CloseIcon fontSize="inherit" />
                      </IconButton>
                    }
                    severity="error"
                    className={classes.alertBox}
                  >
                    {songError}
                  </Alert>
                </Collapse>
                <Grid container direction='row' wrap='nowrap' spacing={2}>
                  <Grid item>
                    <audio ref={audioRef} hidden></audio>
                    <UploadButtons audioRef={audioRef}/>
                  </Grid>
                  <Grid item>
                    <AudioProgress audioRef={audioRef}/>
                  </Grid>
                </Grid>
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