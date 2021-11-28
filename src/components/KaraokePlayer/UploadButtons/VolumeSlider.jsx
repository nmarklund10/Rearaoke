import { useState } from 'react';
import { Slider } from '@mui/material';
import { VolumeUpRounded, VolumeDownRounded } from '@mui/icons-material';

const classes = {
  volumeSlider: {
    marginLeft: (theme) => theme.spacing(1),
    marginRight: (theme) => theme.spacing(1),
    width: '4vw'
  }
};

export default function VolumeSlider(props) {
  const disabled = props.disabled;
  const audioRef = props.audioRef.current === undefined ? {volume: 1} : props.audioRef.current
  const [volume, setVolume] = useState(100);

  audioRef.volume = volume / 100;

  const onVolumechange = (event, newVolume) => {
    setVolume(newVolume);
  }

  return (
    <>
      <VolumeDownRounded/>
        <Slider sx={classes.volumeSlider} aria-label="Volume"
                value={volume}  valueLabelDisplay="auto" onChange={onVolumechange}
                disabled={disabled}/>
      <VolumeUpRounded/>
    </>
  );
}