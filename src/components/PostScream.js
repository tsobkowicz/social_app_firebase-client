import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';

// MUI components
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import CircularProgress from '@material-ui/core/CircularProgress';

// Icons
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { postScream } from '../redux/actions/dataActions';

// Components, utils
import MyButton from '../util/MyButton';

const useStyles = makeStyles({
  textField: {
    margin: '10px auto 10px auto',
  },
  closeButton: {
    position: 'absolute',
    left: '90%',
    top: '10%',
  },
  submitButton: {
    postition: 'relative',
  },
  progressSpiner: {
    position: 'absolute',
  },
});

const PostScream = () => {
  // MUI
  const classes = useStyles();

  // React component local state
  const [open, setOpen] = useState(false);
  const [body, setBody] = useState('');
  const [errors, setErrors] = useState(null);

  // const [form, setForm] = useState({
  //   body: '',
  //   errors: {},
  // });
  // const { body, errors } = form;

  // Redux
  const UI = useSelector((state) => state.UI);
  const dispatch = useDispatch();

  // handlers
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setErrors({});
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(postScream({ body }));
  };
  const handleChange = (e) => {
    setBody(e.target.value);
  };

  // Side effects
  useEffect(() => {
    if (UI.errors) {
      setErrors(UI.errors);
    }
    if (!UI.errors && !UI.loading) {
      setOpen(false);
      setBody('');
      setErrors({});
    }
  }, [UI.errors, UI.loading]);

  return (
    <>
      <MyButton onClick={handleOpen} tip="Post a Scream">
        <AddIcon />
      </MyButton>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <MyButton
          tip="Close"
          onClick={handleClose}
          tipClassName={classes.closeButton}
        >
          <CloseIcon />
        </MyButton>
        <DialogTitle>Post a new scream</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <TextField
              name="body"
              type="text"
              label="Scream"
              multiline
              rows="3"
              placeholder="Scream at your fellow apes"
              error={!!errors?.body}
              helperText={errors?.body}
              className={classes.textField}
              onChange={handleChange}
              fullWidth
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.submitButton}
              disabled={UI.loading}
            >
              Submit
              {UI.loading && (
                <CircularProgress
                  size={30}
                  className={classes.progressSpiner}
                />
              )}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PostScream;
