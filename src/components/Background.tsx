import { Box, Theme } from '@mui/material';

const classes = {
  bg: {
    position: 'fixed',
    top: '0',
    bottom: '0',
    zIndex: '-10',
    height: '100%',
    width: '100%',
    backgroundColor: (theme: Theme) => theme.palette.secondary.main
  }
};

export const Background = () => {
  return (
    <Box component='canvas' id='bg' data-testid='bg' sx={classes.bg}/>
  );
};
