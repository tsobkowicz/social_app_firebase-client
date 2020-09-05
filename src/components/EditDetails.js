import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';

// MUI components
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

// Icons, images, etc.
import EditIcon from '@material-ui/icons/Edit';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { editUserDetails } from '../redux/actions/userActions';

// Util
import MyButton from '../util/MyButton';

const useStyles = makeStyles({
  button: {
    position: 'relative',
    float: 'right',
  },
  textField: {
    margin: '10px auto 10px auto',
  },
});

const EditDetails = () => {
  // MUI
  const classes = useStyles();

  // React component local state
  const [details, setDetails] = useState({
    bio: '',
    website: '',
    location: '',
  });
  const [open, setOpen] = useState(false);

  // Redux
  const credentials = useSelector((state) => state.user.credentials);
  const dispatch = useDispatch();

  // Custom functions
  const mapUserDetailsToState = (userDetails) => {
    setDetails({
      bio: userDetails.bio ? userDetails.bio : '',
      website: userDetails.website ? userDetails.website : '',
      location: userDetails.location ? userDetails.location : '',
    });
  };

  // Side effects
  useEffect(() => {
    mapUserDetailsToState(credentials);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // handlers
  const handleOpen = () => {
    setOpen(true);
    mapUserDetailsToState(credentials);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    setDetails({ ...details, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    const userDetails = {
      bio: details.bio,
      website: details.website,
      location: details.location,
    };
    dispatch(editUserDetails(userDetails));
  };

  return (
    <>
      <MyButton
        tip="Edit details"
        placement="top"
        onClick={handleOpen}
        btnClassName={classes.button}
      >
        <EditIcon color="primary" />
      </MyButton>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>Edit your details</DialogTitle>
        <DialogContent>
          <form>
            <TextField
              name="bio"
              type="text"
              label="Bio"
              multiline
              rows="3"
              placeholder="A short bio about yourself"
              className={classes.textField}
              value={details.bio}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              name="website"
              type="text"
              label="Website"
              placeholder="Your personal/professional website"
              className={classes.textField}
              value={details.website}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              name="location"
              type="text"
              label="Location"
              placeholder="Where you live"
              className={classes.textField}
              value={details.location}
              onChange={handleChange}
              fullWidth
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default EditDetails;
