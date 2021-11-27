import { useRef, useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Grid, Card, CardContent, Typography, Collapse, IconButton } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { useSelector, useDispatch } from 'react-redux';
import AudioProgress from './AudioProgress';
import UploadButtons from './UploadButtons/UploadButtons';
import LyricWindow from './LyricWindow';
import '@fontsource/roboto';
import { setUploadError } from './uploadErrorSlice';
import { setSongDuration, setSongCurrentTime, setSongSeekValue, setSongSrc } from './songSlice';
import CloseIcon from '@material-ui/icons/Close';
import NowPlaying from './NowPlaying';

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

export default function KaraokeHolder() {
  const classes = useStyles();
  const audioRef = useRef();
  const songSrc = useSelector((state) => state.song.value.src);
  const songKaraoke = useSelector((state) => state.song.value.karaoke);
  const uploadError = useSelector((state) => state.uploadError.value);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(uploadError !== null);

  if (songKaraoke !== null) {
    var lrcDuration = songKaraoke[songKaraoke.length - 1].end;
  }

  useEffect(() => {
    audioRef.current.src = songSrc;
  }, [songSrc]);

  useEffect(() => {
    setOpen(uploadError !== null);
  }, [uploadError]);

  const onAlertClose = (event) => {
    dispatch(setUploadError(null))
    setOpen(false);
  }

  const resetAudioFile = () => {
    dispatch(setSongSrc(null));
    dispatch(setSongCurrentTime(null));
    dispatch(setSongDuration(null));
    dispatch(setSongDuration(null));
  }

  const onLoadAudioFile = (event) => {
    let audioDuration = audioRef.current.duration;
    if (audioDuration < lrcDuration) {
      resetAudioFile();
      dispatch(setUploadError(`Audio file (${audioDuration}) is shorter than LRC indicates (${lrcDuration}).`));
    }
    else {
      dispatch(setSongDuration(audioDuration));
      dispatch(setSongCurrentTime(audioRef.current.currentTime));
      dispatch(setSongSeekValue(0));
    }
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
                    {uploadError}
                  </Alert>
                </Collapse>
                <Grid container direction='row' wrap='nowrap' spacing={2}>
                  <Grid item>
                    <audio ref={audioRef} onLoadedMetadata={onLoadAudioFile} hidden></audio>
                    <UploadButtons audioRef={audioRef}/>
                  </Grid>
                  <Grid item>
                    <AudioProgress/>
                  </Grid>
                </Grid>
                <Typography variant='h4' className={classes.paddedHeader}>Lyric Window</Typography>
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