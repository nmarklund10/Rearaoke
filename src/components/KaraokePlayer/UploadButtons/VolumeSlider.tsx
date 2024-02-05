import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { Slider, Theme } from '@mui/material';
import { VolumeUpRounded, VolumeDownRounded } from '@mui/icons-material';
import { setSongVolume } from '../../../store/songSlice';
import { RearaokeState } from '../../../store/store.type';
import { UNINIT_NUM } from '../../../store/constants';

const classes = {
  volumeSlider: {
    marginLeft: (theme: Theme) => theme.spacing(1),
    marginRight: (theme: Theme) => theme.spacing(1),
    width: '4vw'
  }
};

const propTypes = {
  disabled: PropTypes.bool.isRequired
};

type VolumeSliderProps = PropTypes.InferProps<typeof propTypes>;


const VolumeSlider = (props: VolumeSliderProps) => {
  const dispatch = useDispatch();
  let volume = useSelector((state: RearaokeState) => state.song.value.volume);
  volume = volume !== UNINIT_NUM ? Math.round(volume * 100) : 100;

  const onVolumechange = (_: Event, newVolume: number | number[]) => {
    if (Array.isArray(newVolume)) {
      newVolume = newVolume[0];
    }
    dispatch(setSongVolume(newVolume / 100));
  };

  return (
    <>
      <VolumeDownRounded/>
      <Slider sx={classes.volumeSlider} aria-label='Volume'
        value={volume}  valueLabelDisplay='auto'
        onChange={onVolumechange} disabled={props.disabled}
      />
      <VolumeUpRounded/>
    </>
  );
};

VolumeSlider.propTypes = propTypes;

export { VolumeSlider };
