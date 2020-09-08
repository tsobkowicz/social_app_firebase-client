import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import dayjs from 'dayjs';

// MUI components
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

// Icons
import CloseIcon from '@material-ui/icons/Close';
import UnfoldMoreIcon from '@material-ui/icons/UnfoldMore';
import ChatIcon from '@material-ui/icons/Chat';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { getScream } from '../redux/actions/dataActions';

// Components, utils
import MyButton from '../util/MyButton';
import LikeButton from './LikeButton';

const useStyles = makeStyles({
  expandButton: {
    position: 'absolute',
    left: '90%',
  },
  closeButton: {
    position: 'absolute',
    left: '90%',
  },
  profileImage: {
    maxWidth: 200,
    height: 200,
    borderRadius: '50%',
    objectFit: 'cover',
  },
  invisibleSeparator: {
    border: 'none',
    margin: 4,
  },
  dialogContent: {
    padding: 20,
  },
  spinnerDiv: {
    textAlign: 'center',
    marginTop: 50,
    marginBottom: 50,
  },
});

const ScreamDialog = ({ screamId, userHandle }) => {
  // React local state
  const [open, setOpen] = useState(false);

  // Redux
  const loading = useSelector((state) => state.UI.loading);
  const scream = useSelector((state) => state.data.scream);
  const { body, createdAt, likeCount, commentCount, userImage } = scream;
  const dispatch = useDispatch();

  // MUI styling
  const classes = useStyles();

  // handlers
  const handleOpen = () => {
    setOpen(true);
    dispatch(getScream(screamId));
  };
  const handleClose = () => {
    setOpen(false);
  };

  // logic
  const dialogMarkup = loading ? (
    <div className={classes.spinnerDiv}>
      <CircularProgress size={200} thickness={2} />
    </div>
  ) : (
    <Grid container spacing={2}>
      <Grid item sm={5}>
        <img src={userImage} alt="Profile" className={classes.profileImage} />
      </Grid>
      <Grid item sm={7}>
        <Typography
          color="primary"
          variant="h5"
          component={Link}
          to={`/users/${userHandle}`}
        >
          @{userHandle}
        </Typography>
        <hr className={classes.invisibleSeparator} />
        <Typography variant="body2" color="textSecondary">
          {dayjs(createdAt).format('h:mm a, MMMM DD YYYY')}
        </Typography>
        <hr className={classes.invisibleSeparator} />
        <Typography variant="body1">{body}</Typography>
        <LikeButton screamId={screamId} />
        <span>{likeCount} likes</span>
        <MyButton tip="comments">
          <ChatIcon color="primary" />
        </MyButton>
        <span>{commentCount} comments</span>
      </Grid>
    </Grid>
  );

  return (
    <>
      <MyButton
        onClick={handleOpen}
        tip="Expand scream"
        tipClassName={classes.expandButton}
      >
        <UnfoldMoreIcon color="primary" />
      </MyButton>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <MyButton
          tip="Close"
          onClick={handleClose}
          tipClassName={classes.closeButton}
        >
          <CloseIcon />
        </MyButton>
        <DialogContent className={classes.dialogContent}>
          {dialogMarkup}
        </DialogContent>
      </Dialog>
    </>
  );
};

ScreamDialog.propTypes = {
  screamId: PropTypes.string.isRequired,
  userHandle: PropTypes.string.isRequired,
};

export default ScreamDialog;
