import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button } from '@material-ui/core';
import AttachFileRoundedIcon from '@material-ui/icons/AttachFileRounded';
import { setUploadError } from '../uploadErrorSlice';
import { parseLrcFile } from '../../../js/lrcFileParser';
import { setSong } from '../songSlice';


export default function LrcUpload(props) {
  const uploadButtonClass = props.uploadButtonClass;
  const dispatch = useDispatch();
  const [lrcKey, setLrcKey] = useState(Date.now());

  const onLrcUploadInput = (event) => {
    const files = event.target.files;

    if (files.length === 0) {
      dispatch(setUploadError('File upload failed!'));
    }
    else {
      const file = files[0];
      const reader = new FileReader();
      reader.addEventListener('load', (loadEvent) => {
        let lrcFileData = loadEvent.target.result;
        try {
          let parsedSong= parseLrcFile(lrcFileData);
          dispatch(setSong(parsedSong));
        } catch(error) {
          dispatch(setUploadError(error.message));
        }
        setLrcKey(Date.now());
      });
      reader.readAsText(file);
    }
  }

  return (
    <Button className={uploadButtonClass} component="label"
            onInput={onLrcUploadInput} endIcon={<AttachFileRoundedIcon/>}>
      .LRC
      <input type="file" hidden key={lrcKey}/>
    </Button>
  );
}