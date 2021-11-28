import { useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Paper, Grid, Card, CardContent, Typography, } from '@mui/material';
import { setSongDuration, setSongCurrentTime, setSongSeekValue, setSongSrc } from './songSlice';
import { setUploadError } from './uploadErrorSlice';
import NowPlaying from './NowPlaying';
import UploadError from './UploadError';
import AudioProgress from './AudioProgress';
import LyricWindow from './LyricWindow';
import UploadButtons from './UploadButtons/UploadButtons';

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
  const dispatch = useDispatch();
  const audioRef = useRef();
  const songSrc = useSelector((state) => state.song.value.src);
  const songKaraoke = useSelector((state) => state.song.value.karaoke);

  if (songKaraoke !== null) {
    var lrcDuration = songKaraoke[songKaraoke.length - 1].end;
  }

  useEffect(() => {
    audioRef.current.src = songSrc;
  }, [songSrc]);

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
                    <audio ref={audioRef} onLoadedMetadata={onLoadAudioFile} hidden></audio>
                    <UploadButtons audioRef={audioRef}/>
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