import { useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Collapse, IconButton } from '@mui/material';
import { Alert } from '@mui/material';
import { Close } from '@mui/icons-material';
import { setUploadError } from './uploadErrorSlice';

const classes = {
  alertBox: {
    marginTop: (theme) => theme.spacing(1),
    marginBottom: (theme) => theme.spacing(1)
  }
};

export default function UploadError() {
  const dispatch = useDispatch();
  const uploadError = useSelector((state) => state.uploadError.value);
  const [open, setOpen] = useState(uploadError !== null);

  useEffect(() => {
    setOpen(uploadError !== null);
  }, [uploadError]);

  const onAlertClose = (event) => {
    dispatch(setUploadError(null))
    setOpen(false);
  }

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
}