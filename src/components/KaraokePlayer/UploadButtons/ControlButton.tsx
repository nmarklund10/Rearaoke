import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from '@mui/material';
import { PlayArrowRounded, Pause } from '@mui/icons-material';
import { setSongPlaying } from '../../../store/songSlice';
import { RearaokeState } from '../../../store/store.type';

const propTypes = {
  disabled: PropTypes.bool.isRequired
};

type ControlButtonProps = PropTypes.InferProps<typeof propTypes>;

const ControlButton = (props: ControlButtonProps) => {
  const dispatch = useDispatch();
  let songPlaying = useSelector((state: RearaokeState) => state.song.value.songPlaying);
  songPlaying = songPlaying != null ? songPlaying : false;

  const playSong = () => {
    dispatch(setSongPlaying(true));
  };

  const pauseSong = () => {
    dispatch(setSongPlaying(false));
  };

  const classes = {
    controlButton: {
      '&:hover': {
        backgroundColor: songPlaying ? 'darksalmon' : 'darkgreen'
      },
      backgroundColor: songPlaying ? 'orange' : 'green',
      color: 'white'
    }
  };

  return (
    <Button sx={classes.controlButton} disabled={props.disabled}
      onClick={songPlaying ? pauseSong : playSong}
      disableRipple={true}>
      {songPlaying ? <Pause/> : <PlayArrowRounded/>}
    </Button>
  );
};

ControlButton.propTypes = propTypes;

export { ControlButton };