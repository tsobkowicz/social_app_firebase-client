import React, { useState, useEffect } from 'react';
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
import { getScream, clearErrors } from '../../redux/actions/dataActions';

// Components, utils
import MyButton from '../../util/MyButton';
import LikeButton from './LikeButton';
import Comments from './Comments';
import CommentForm from './CommentForm';

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
  visibleSeparator: {
    width: '100%',
    borderBottom: '1px solid rgba(0,0,0,0.1)',
    marginBottom: 20,
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

const ScreamDialog = ({ screamId, userHandle, openDialog }) => {
  // React local state
  const [open, setOpen] = useState(false);
  const [oldUrl, setOldUrl] = useState('');
  // eslint-disable-next-line no-unused-vars
  const [newUrl, setNewUrl] = useState('');

  // Redux
  const loading = useSelector((state) => state.UI.loading);
  const scream = useSelector((state) => state.data.scream);
  const {
    body,
    createdAt,
    likeCount,
    commentCount,
    userImage,
    comments,
  } = scream;
  const dispatch = useDispatch();

  // MUI styling
  const classes = useStyles();

  // handlers
  const handleOpen = () => {
    // logic for changing URL while openDialog is true
    let oldPath = window.location.pathname;
    const newPath = `/users/${userHandle}/scream/${screamId}`;
    // handle edge case where you copy paste URL
    if (oldPath === newPath) oldPath = `/users/${userHandle}`;
    window.history.pushState(null, null, newPath);

    setOpen(true);
    setOldUrl(oldPath);
    setNewUrl(newPath);
    dispatch(getScream(screamId));
  };
  const handleClose = () => {
    window.history.pushState(null, null, oldUrl);
    setOpen(false);
    dispatch(clearErrors());
  };

  // Side effects
  useEffect(() => {
    if (openDialog) {
      handleOpen();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
          {userHandle}
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
      <hr className={classes.visibleSeparator} />
      <CommentForm screamId={screamId} />
      <Comments comments={comments} />
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
  openDialog: PropTypes.bool,
};

export default ScreamDialog;
