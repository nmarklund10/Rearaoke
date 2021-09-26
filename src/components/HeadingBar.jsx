import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Brightness3Icon from '@material-ui/icons/Brightness3';
import Brightness7Icon from '@material-ui/icons/Brightness7';
import { AppBar, Toolbar, Typography, Button } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  title: {
    flexGrow: 1,
  },
}));

export default function HeadingBar(props) {
  const classes = useStyles();
  const onTrigger = () => {
      props.parentCallback();
  }
  const icon = props.isLightTheme ? <Brightness3Icon/> : <Brightness7Icon/>;

  return (
    <AppBar>
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