import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button } from '@material-ui/core';
import MusicNoteRoundedIcon from '@material-ui/icons/MusicNoteRounded';
import { setUploadError } from '../uploadErrorSlice';
import { setSongSrc } from '../songSlice';

export default function AudioUpload(props) {
  const uploadButtonClass = props.uploadButtonClass;
  const disabled = props.disabled;
  const [audioKey, setAudioKey] = useState(Date.now());
  const dispatch = useDispatch();

  const onAudioUploadInput = (event) => {
    const files = event.target.files;

    if (files.length === 0) {
      dispatch(setUploadError('File upload failed!'));
    }
    else {
      const file = files[0];
      let audioUrl = URL.createObjectURL(file);
      dispatch(setSongSrc(audioUrl));
    }
    setAudioKey(Date.now());
  }

  return (
    <Button className={uploadButtonClass} component="label"
            onInput={onAudioUploadInput} endIcon={<MusicNoteRoundedIcon/>}
            disabled={disabled}>
      Audio
      <input type="file" hidden key={audioKey} />
    </Button>
  );
}