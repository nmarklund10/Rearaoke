import { makeStyles } from '@material-ui/core/styles';
import { useSelector, useDispatch } from 'react-redux';
import { setSong } from './songSlice';
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
  let audioSrc = '';
  try {
    audioSrc = props.audioRef.current.src;
  } catch(e) {}
  const dispatch = useDispatch();
  const controlButtonsDisabled = song === null || audioSrc === '';

  const onLrcUploadChange = (event) => {
    const files = event.target.files;

    if (files.length === 0) {
      console.error('File upload failed!');
    }
    else {
      const file = files[0];
      const reader = new FileReader();
      reader.addEventListener('load', (loadEvent) => {
        let lrc = loadEvent.target.result;
        dispatch(setSong(lrc));
      });
      reader.readAsText(file);
    }
  }

  const onAudioUploadChange = (event) => {
    const files = event.target.files;

    if (files.length === 0) {
      console.error('File upload failed!');
    }
    else {
      const file = files[0];
      let audioUrl = URL.createObjectURL(file);
      props.audioRef.current.src = audioUrl;
    }
  }

  return (
    <>
      <FormGroup className={classes.controls}>
        <ButtonGroup disableElevation={true} variant="contained">
          <Button className={classes.uploadButton} component="label"
                  onChange={onLrcUploadChange} endIcon={<AttachFileRoundedIcon/>}>
            .LRC
            <input type="file" hidden />
          </Button>
          <Button className={classes.uploadButton} component="label"
                  onChange={onAudioUploadChange} endIcon={<MusicNoteRoundedIcon/>}
                  disabled={song === null}>
            Audio
            <input type="file" hidden />
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