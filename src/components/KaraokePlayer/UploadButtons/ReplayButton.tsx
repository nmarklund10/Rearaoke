import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { Button } from '@mui/material';
import { ReplayRounded } from '@mui/icons-material';
import { setSongPlaying, setSongSeekValue } from '../../../store/songSlice';

const classes = {
  replayButton: {
    '&:hover': {
      backgroundColor: 'darkgray'
    },
    backgroundColor: 'gray',
    color: 'white'
  }
};

const propTypes = {
  disabled: PropTypes.bool.isRequired
};

type ReplayButtonProps = PropTypes.InferProps<typeof propTypes>;

const ReplayButton = (props: ReplayButtonProps) => {
  const dispatch = useDispatch();

  const replaySong = () => {
    dispatch(setSongPlaying(false));
    dispatch(setSongSeekValue(0));
  };

  return (
    <Button sx={classes.replayButton} disableRipple={true}
      onClick={replaySong} disabled={props.disabled}>
      <ReplayRounded/>
    </Button>
  );
};

ReplayButton.propTypes = propTypes;

export { ReplayButton };