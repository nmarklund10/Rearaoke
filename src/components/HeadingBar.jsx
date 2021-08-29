import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Brightness3Icon from "@material-ui/icons/Brightness3";
import Brightness7Icon from "@material-ui/icons/Brightness7";
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function HeadingBar(props) {
  const classes = useStyles();
  const onTrigger = () => {
      props.parentCallback();
  }
  const icon = props.isLightTheme ? <Brightness3Icon/> : <Brightness7Icon/>

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          Rearaoke
        </Typography>
        <Button color="inherit" aria-label="Change Theme" endIcon={icon} onClick={onTrigger}>
          {props.isLightTheme ? "Change to Dark Theme" : "Change to Light Theme"}
        </Button>
      </Toolbar>
    </AppBar>
  );
}