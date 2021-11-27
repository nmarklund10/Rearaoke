import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector, useDispatch } from 'react-redux';
import { setSong, setSongSrc } from './songSlice';
import { setUploadError } from './uploadErrorSlice';
import { parseLrcFile } from '../../js/lrcFileParser';
import { ButtonGroup, Button, Slider, FormGroup } from '@material-ui/core';
import AttachFileRoundedIcon from '@material-ui/icons/AttachFileRounded';
import MusicNoteRoundedIcon from '@material-ui/icons/MusicNoteRounded';
import PlayArrowRoundedIcon from '@material-ui/icons/PlayArrowRounded';
import ReplayRoundedIcon from '@material-ui/icons/ReplayRounded';
import VolumeUpRoundedIcon from '@material-ui/icons/VolumeUpRounded';
import VolumeDownRoundedIcon from '@material-ui/icons/VolumeDownRounded';


const useStyles = makeStyles((theme) => ({
  controls: {
    flexDirection: 'row'
  },
  uploadButton: {
    backgroundColor: theme.palette.primary.main,
    color: 'white'
  },
  controlButton: {
    backgroundColor: 'green',
    color: 'white'
  },
  replayButton: {
    backgroundColor: 'gray',
    color: 'white'
  },
  volumeSlider: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: '4vw'
  }
}));

export default function UploadButtons(props) {
  const classes = useStyles();
  const song = useSelector((state) => state.song.value);
  const dispatch = useDispatch();
  const controlButtonsDisabled = song.karaoke === null || song.src === null;
  const [lrcKey, setLrcKey] = useState(Date.now());
  const [audioKey, setAudioKey] = useState(Date.now());

  const onLrcUploadInput = (event) => {
    const files = event.target.files;

    if (files.length === 0) {
      dispatch(setUploadError('File upload failed!'));
    }
    else {
      const file = files[0];
      const reader = new FileReader();
      reader.addEventListener('load', (loadEvent) => {
        let lrcFileData = loadEvent.target.result;
        try {
          let parsedSong= parseLrcFile(lrcFileData);
          dispatch(setSong(parsedSong));
        } catch(error) {
          dispatch(setUploadError(error.message));
        }
        setLrcKey(Date.now());
      });
      reader.readAsText(file);
    }
  }

  const onAudioUploadInput = (event) => {
    const files = event.target.files;

    if (files.length === 0) {
      dispatch(setUploadError('File upload failed!'));
    }
    else {
      const file = files[0];
      let audioUrl = URL.createObjectURL(file);
      dispatch(setSongSrc(audioUrl));
    }
    setAudioKey(Date.now());
  }

  return (
    <>
      <FormGroup className={classes.controls}>
        <ButtonGroup disableElevation={true} variant="contained">
          <Button className={classes.uploadButton} component="label"
                  onInput={onLrcUploadInput} endIcon={<AttachFileRoundedIcon/>}>
            .LRC
            <input type="file" hidden key={lrcKey}/>
          </Button>
          <Button className={classes.uploadButton} component="label"
                  onInput={onAudioUploadInput} endIcon={<MusicNoteRoundedIcon/>}
                  disabled={song.karaoke === null}>
            Audio
            <input type="file" hidden key={audioKey} />
          </Button>
          <Button className={classes.controlButton} disabled={controlButtonsDisabled}>
            <PlayArrowRoundedIcon/>
          </Button>
          <Button className={classes.replayButton} disabled={controlButtonsDisabled}>
            <ReplayRoundedIcon/>
          </Button>
        </ButtonGroup>
        <VolumeDownRoundedIcon/>
          <Slider className={classes.volumeSlider} aria-label="Volume" value={100}
                  disabled={controlButtonsDisabled}/>
        <VolumeUpRoundedIcon/>
      </FormGroup>
    </>
  );
}