import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  bg: {
    position: 'fixed',
    top: '0',
    bottom: '0',
    zIndex: '-10'
  },
}));

export default function Background() {
  const classes = useStyles();

  return (
    <canvas id="bg" className={classes.bg}/>
  );
}