import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

// MUI components
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

// Icons, images, ets.
import ChatIcon from '@material-ui/icons/Chat';

// Redux
import { useSelector } from 'react-redux';

// components, utils
import DeleteScream from './DeleteScream';
import ScreamDialog from './ScreamDialog';
import MyButton from '../../util/MyButton';
import LikeButton from './LikeButton';

const useStyles = makeStyles({
  card: {
    display: 'flex',
    marginBottom: 20,
    position: 'relative',
  },
  content: {
    padding: 25,
    objectFit: 'cover',
  },
  image: {
    minWidth: 200,
  },
});

const Scream = ({ scream }) => {
  const {
    body,
    createdAt,
    userImage,
    userHandle,
    screamId,
    likeCount,
    commentCount,
  } = scream;

  // Redux
  const user = useSelector((state) => state.user);
  const {
    authenticated,
    credentials: { handle },
  } = user;

  // Dayjs plugin
  dayjs.extend(relativeTime);

  // MUI styling
  const classes = useStyles();

  // Logic for the delete button
  const deleteButton =
    authenticated && userHandle === handle ? (
      <DeleteScream screamId={screamId} />
    ) : null;

  return (
    <Card className={classes.card}>
      <CardMedia
        image={userImage}
        title="Profile image"
        className={classes.image}
      />
      <CardContent className={classes.content}>
        <Typography
          variant="h5"
          component={Link}
          to={`/users/${userHandle}`}
          color="primary"
        >
          {userHandle}
        </Typography>
        {deleteButton}
        <Typography variant="body2" color="textSecondary">
          {dayjs(createdAt).fromNow()}
        </Typography>
        <Typography variant="body1">{body}</Typography>
        <LikeButton screamId={screamId} />
        <span>{likeCount} likes</span>
        <MyButton tip="comments">
          <ChatIcon color="primary" />
        </MyButton>
        <span>{commentCount} comments</span>
        <ScreamDialog screamId={screamId} userHandle={userHandle} />
      </CardContent>
    </Card>
  );
};

Scream.propTypes = {
  scream: PropTypes.shape({
    body: PropTypes.string,
    createdAt: PropTypes.string,
    userImage: PropTypes.string,
    userHandle: PropTypes.string,
    screamId: PropTypes.string,
    likeCount: PropTypes.number,
    commentCount: PropTypes.number,
  }),
};

export default Scream;
