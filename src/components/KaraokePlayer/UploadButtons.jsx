import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { ButtonGroup, Button, Slider, FormGroup, LinearProgress } from '@material-ui/core';
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

export default function UploadButtons() {
  const classes = useStyles();

  return (
    <>
      <FormGroup className={classes.controls}>
        <ButtonGroup disableElevation={true} variant="contained">
          <Button className={classes.uploadButton} endIcon={<AttachFileRoundedIcon/>}>
            .LRC
          </Button>
          <Button className={classes.uploadButton} endIcon={<MusicNoteRoundedIcon/>}>
            Audio
          </Button>
          <Button className={classes.controlButton}>
            <PlayArrowRoundedIcon/>
          </Button>
          <Button className={classes.replayButton}>
            <ReplayRoundedIcon/>
          </Button>
        </ButtonGroup>
        <VolumeDownRoundedIcon/>
          <Slider className={classes.volumeSlider} aria-label="Volume" value={100}/>
        <VolumeUpRoundedIcon/>
      </FormGroup>
    </>
  );
}