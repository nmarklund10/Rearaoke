import { useState, ChangeEvent } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { Button, SxProps, Theme } from '@mui/material';
import { AttachFileRounded } from '@mui/icons-material';
import { setUploadError } from '../../../store/uploadErrorSlice';
import { parseLrcFile } from '../../../ts/lrcFileParser';
import { setSong, setSongSrc } from '../../../store/songSlice';
import { UNINIT_STR } from '../../../store/constants';

const propTypes = {
  uploadButtonClass: PropTypes.object.isRequired
};

type LrcUploadProps = {
  uploadButtonClass: SxProps<Theme>
}

const LrcUpload = (props: LrcUploadProps) => {
  const dispatch = useDispatch();
  const uploadButtonClass = props.uploadButtonClass;
  const [lrcKey, setLrcKey] = useState(Date.now());

  const onLrcUploadInput = (event: unknown) => {
    const newEvent = event as ChangeEvent<HTMLInputElement>;
    const files = newEvent.target.files;

    if (files == null || files.length === 0) {
      dispatch(setUploadError('File upload failed'));
    }
    else {
      const file = files[0];
      const reader = new FileReader();
      reader.addEventListener('load', (loadEvent) => {
        const lrcFileData = loadEvent?.target?.result;
        try {
          const parsedSong = parseLrcFile(lrcFileData);
          dispatch(setSong(parsedSong));
          dispatch(setSongSrc(UNINIT_STR));
        } catch (error) {
          if (error instanceof Error) {
            dispatch(setUploadError(error.message));
          }
        }
        setLrcKey(Date.now());
      });
      reader.readAsText(file);
      dispatch(setUploadError(null));
    }
  };

  return (
    <Button sx={uploadButtonClass} component="label"
      onInput={onLrcUploadInput} endIcon={<AttachFileRounded/>}>
      .LRC
      <input type="file" hidden key={lrcKey}/>
    </Button>
  );
};

LrcUpload.propTypes = propTypes;

export { LrcUpload };
