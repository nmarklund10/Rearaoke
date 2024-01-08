import { ChangeEvent, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { Button, SxProps, Theme } from '@mui/material';
import { MusicNoteRounded } from '@mui/icons-material';
import { setUploadError } from '../../../store/uploadErrorSlice';
import { setSongSrc } from '../../../store/songSlice';

const propTypes = {
  uploadButtonClass: PropTypes.object.isRequired,
  disabled: PropTypes.bool.isRequired
};

type AudioUploadProps = {
  uploadButtonClass: SxProps<Theme>,
  disabled: boolean
}

const AudioUpload = (props: AudioUploadProps) => {
  const dispatch = useDispatch();
  const uploadButtonClass = props.uploadButtonClass;
  const disabled = props.disabled;
  const [audioKey, setAudioKey] = useState(Date.now());

  const onAudioUploadInput = (event: unknown) => {
    const newEvent = event as ChangeEvent<HTMLInputElement>;
    const files = newEvent.target.files;

    if (files == null || files.length === 0) {
      dispatch(setUploadError('File upload failed'));
    }
    else {
      const file = files[0];
      const audioUrl = URL.createObjectURL(file);
      dispatch(setSongSrc(audioUrl));
    }
    setAudioKey(Date.now());
  };

  return (
    <Button sx={uploadButtonClass} component="label"
      onInput={onAudioUploadInput} endIcon={<MusicNoteRounded/>}
      disabled={disabled}>
      Audio
      <input type="file" hidden key={audioKey}/>
    </Button>
  );
};

AudioUpload.propTypes = propTypes;

export { AudioUpload };