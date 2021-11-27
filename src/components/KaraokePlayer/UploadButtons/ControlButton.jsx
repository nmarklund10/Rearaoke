import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PlayArrowRoundedIcon from '@material-ui/icons/PlayArrowRounded';

const useStyles = makeStyles((theme) => ({
  controlButton: {
    backgroundColor: 'green',
    color: 'white'
  },
}));

export default function ControlButton(props) {
  const classes = useStyles();
  const disabled = props.disabled;

  return (
    <Button className={classes.controlButton} disabled={disabled}>
      <PlayArrowRoundedIcon/>
    </Button>
  );
}