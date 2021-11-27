import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { ButtonGroup, FormGroup } from '@material-ui/core';
import LrcUpload from './LrcUpload';
import AudioUpload from './AudioUpload';
import ControlButton from './ControlButton';
import ReplayButton from './ReplayButton';
import VolumeSlider from './VolumeSlider';


const useStyles = makeStyles((theme) => ({
  controls: {
    flexDirection: 'row'
  },
  uploadButton: {
    backgroundColor: theme.palette.primary.main,
    color: 'white'
  }
}));

export default function UploadButtons(props) {
  const classes = useStyles();
  const song = useSelector((state) => state.song.value);
  const audioButtonDisabled = song.karaoke === null;
  const controlButtonsDisabled = audioButtonDisabled || song.src === null;

  return (
    <>
      <FormGroup className={classes.controls}>
        <ButtonGroup disableElevation={true} variant="contained">
          <LrcUpload uploadButtonClass={classes.uploadButton}/>
          <AudioUpload uploadButtonClass={classes.uploadButton} disabled={audioButtonDisabled}/>
          <ControlButton disabled={controlButtonsDisabled}/>
          <ReplayButton disabled={controlButtonsDisabled}/>
        </ButtonGroup>
        <VolumeSlider audioRef={props.audioRef} disabled={controlButtonsDisabled}/>
      </FormGroup>
    </>
  );
}