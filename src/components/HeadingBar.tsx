import PropTypes from 'prop-types';
import Brightness3Icon from '@mui/icons-material/Brightness3';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { AppBar, Toolbar, Typography, Button, Theme } from '@mui/material';

const classes = {
  headingBar: {
    backgroundColor: (theme: Theme) => theme.palette.primary.main
  },
  title: {
    flexGrow: 1,
  }
};

const propTypes = {
  parentCallback: PropTypes.func.isRequired,
  isLightTheme: PropTypes.bool.isRequired
};

type HeadingBarProps = PropTypes.InferProps<typeof propTypes>;

const HeadingBar = (props: HeadingBarProps) => {
  const onTrigger = () => {
    props.parentCallback();
  };
  const icon = props.isLightTheme ? <Brightness3Icon/> : <Brightness7Icon/>;

  return (
    <AppBar>
      <Toolbar sx={classes.headingBar}>
        <Typography variant='h6' sx={classes.title}>
          Rearaoke
        </Typography>
        <Button color='inherit' aria-label='Change Theme' endIcon={icon} onClick={onTrigger}>
          {props.isLightTheme ? 'Change to Dark Theme' : 'Change to Light Theme'}
        </Button>
      </Toolbar>
    </AppBar>
  );
};

HeadingBar.propTypes = propTypes;

export { HeadingBar };