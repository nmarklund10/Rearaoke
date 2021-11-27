import { useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { Collapse, IconButton } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import CloseIcon from '@material-ui/icons/Close';
import { setUploadError } from './uploadErrorSlice';

const useStyles = makeStyles((theme) => ({
  alertBox: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1)
  }
}));

export default function UploadError() {
  const classes = useStyles();
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
            <CloseIcon fontSize="inherit" />
          </IconButton>
        }
        severity="error"
        className={classes.alertBox}
      >
        {uploadError}
      </Alert>
    </Collapse>
  );
}