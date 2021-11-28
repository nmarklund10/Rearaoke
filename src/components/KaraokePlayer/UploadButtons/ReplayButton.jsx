import { Button } from '@mui/material';
import { ReplayRounded } from '@mui/icons-material';

const classes = {
  replayButton: {
    backgroundColor: 'gray',
    color: 'white'
  }
};

export default function ReplayButton(props) {
  const disabled = props.disabled;

  return (
    <Button sx={classes.replayButton} disabled={disabled}>
      <ReplayRounded/>
    </Button>
  );
}