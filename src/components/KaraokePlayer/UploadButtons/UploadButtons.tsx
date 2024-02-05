import { useSelector } from 'react-redux';
import { ButtonGroup, FormGroup, Theme } from '@mui/material';
import { LrcUpload } from './LrcUpload';
import { AudioUpload } from './AudioUpload';
import { ControlButton } from './ControlButton';
import { ReplayButton } from './ReplayButton';
import { VolumeSlider } from './VolumeSlider';
import { RearaokeState } from '../../../store/store.type';
import { UNINIT_STR } from '../../../store/constants';


const classes = {
  controls: {
    flexDirection: 'row'
  },
  uploadButton: {
    backgroundColor: (theme: Theme) => theme.palette.primary.main,
    color: 'white'
  }
};

export const UploadButtons = () => {
  const karaoke = useSelector((state: RearaokeState) => state.song.value.karaoke);
  const src = useSelector((state: RearaokeState) => state.song.value.src);
  const audioButtonDisabled = karaoke.length === 0;
  const controlButtonsDisabled = audioButtonDisabled || src === UNINIT_STR;

  return (
    <>
      <FormGroup sx={classes.controls}>
        <ButtonGroup disableElevation={true} variant='contained'>
          <LrcUpload uploadButtonClass={classes.uploadButton}/>
          <AudioUpload uploadButtonClass={classes.uploadButton} disabled={audioButtonDisabled}/>
          <ControlButton disabled={controlButtonsDisabled}/>
          <ReplayButton disabled={controlButtonsDisabled}/>
        </ButtonGroup>
        <VolumeSlider disabled={controlButtonsDisabled}/>
      </FormGroup>
    </>
  );
};
