import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Slider } from '@material-ui/core';
import VolumeUpRoundedIcon from '@material-ui/icons/VolumeUpRounded';
import VolumeDownRoundedIcon from '@material-ui/icons/VolumeDownRounded';


const useStyles = makeStyles((theme) => ({
  volumeSlider: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: '4vw'
  }
}));

export default function VolumeSlider(props) {
  const classes = useStyles();
  const disabled = props.disabled;
  const audioRef = props.audioRef.current === undefined ? {volume: 1} : props.audioRef.current
  const [volume, setVolume] = useState(100);

  audioRef.volume = volume / 100;

  const onVolumechange = (event, newVolume) => {
    setVolume(newVolume);
  }

  return (
    <>
      <VolumeDownRoundedIcon/>
        <Slider className={classes.volumeSlider} aria-label="Volume"
                value={volume}  valueLabelDisplay="auto" onChange={onVolumechange}
                disabled={disabled}/>
      <VolumeUpRoundedIcon/>
    </>
  );
}