import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

// MUI components
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';

// Icons
import DeleteOutline from '@material-ui/icons/DeleteOutline';

// Redux
import { useDispatch } from 'react-redux';
import { deleteScream } from '../redux/actions/dataActions';

// Components
import MyButton from '../util/MyButton';

const useStyles = makeStyles({
  deleteButton: {
    left: '90%',
    top: '10%',
    position: 'absolute',
  },
});

const DeleteScream = ({ screamId }) => {
  // MUI
  const classes = useStyles();

  // React component local state
  const [open, setOpen] = useState(false);

  // Redux
  const dispatch = useDispatch();

  // handlers
  const handleOpenFunc = () => {
    setOpen(true);
  };

  const handleCloseFunc = () => {
    setOpen(false);
  };

  const deleteScreamFunc = () => {
    dispatch(deleteScream(screamId));
    setOpen(false);
  };

  return (
    <>
      <MyButton
        tip="Delete Scream"
        onClick={handleOpenFunc}
        btnClassName={classes.deleteButton}
      >
        <DeleteOutline color="primary" />
      </MyButton>
      <Dialog open={open} onClose={handleCloseFunc} fullWidth maxWidth="sm">
        <DialogTitle>Are you sure you want to delete this scream ?</DialogTitle>
        <DialogActions>
          <Button onClick={handleCloseFunc} color="primary">
            Cancel
          </Button>
          <Button onClick={deleteScreamFunc} color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

DeleteScream.propTypes = {
  screamId: PropTypes.string.isRequired,
};

export default DeleteScream;
