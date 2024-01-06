import { useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Collapse, IconButton, Alert, Theme } from '@mui/material';
import { Close } from '@mui/icons-material';
import { setUploadError } from '../../store/uploadErrorSlice';
import { RearaokeState } from '../../store/store.type';

const classes = {
  alertBox: {
    marginTop: (theme: Theme) => theme.spacing(1),
    marginBottom: (theme: Theme) => theme.spacing(1)
  }
};

export const UploadError = () => {
  const dispatch = useDispatch();
  const uploadError = useSelector((state: RearaokeState) => state.uploadError.value);
  const [open, setOpen] = useState(uploadError !== null);

  useEffect(() => {
    if (uploadError === null) {
      setOpen(false);
    }
    else {
      setOpen(true);
    }
  }, [uploadError]);

  const onAlertClose = () => {
    dispatch(setUploadError(null));
    setOpen(false);
  };

  return (
    <Collapse in={open}>
      <Alert
        action={
          <IconButton
            aria-label="close"
            color="inherit"
            size="small"
            onClick={onAlertClose}
          >
            <Close fontSize="inherit" />
          </IconButton>
        }
        severity="error"
        sx={classes.alertBox}
      >
        {uploadError}
      </Alert>
    </Collapse>
  );
};