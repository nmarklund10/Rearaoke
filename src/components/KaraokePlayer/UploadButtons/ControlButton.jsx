import { Button } from '@mui/material';
import { PlayArrowRounded } from '@mui/icons-material';

const classes = {
  controlButton: {
    backgroundColor: 'green',
    color: 'white'
  }
}

export default function ControlButton(props) {
  const disabled = props.disabled;

  return (
    <Button sx={classes.controlButton} disabled={disabled}>
      <PlayArrowRounded/>
    </Button>
  );
}