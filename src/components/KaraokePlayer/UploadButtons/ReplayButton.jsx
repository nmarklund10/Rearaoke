import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ReplayRoundedIcon from '@material-ui/icons/ReplayRounded';

const useStyles = makeStyles((theme) => ({
  replayButton: {
    backgroundColor: 'gray',
    color: 'white'
  }
}));

export default function ReplayButton(props) {
  const classes = useStyles();
  const disabled = props.disabled;

  return (
    <Button className={classes.replayButton} disabled={disabled}>
      <ReplayRoundedIcon/>
    </Button>
  );
}