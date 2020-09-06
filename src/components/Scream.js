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
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import { likeScream, unlikeScream } from '../redux/actions/dataActions';

// Utils
import MyButton from '../util/MyButton';

const useStyles = makeStyles({
  card: {
    display: 'flex',
    marginBottom: 20,
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
  const dispatch = useDispatch();
  const { authenticated } = user;

  // Custom functions
  // check if the user already like this scream
  const likedScreamFunc = () => {
    if (user.likes && user.likes.find((like) => like.screamId === screamId)) {
      return true;
    }
    return false;
  };

  // Dayjs plugin
  dayjs.extend(relativeTime);

  // MUI styling
  const classes = useStyles();

  // Logic for the like button
  // eslint-disable-next-line no-nested-ternary
  const likeButton = !authenticated ? (
    <MyButton tip="Like">
      <Link to="/login">
        <FavoriteBorder color="primary" />
      </Link>
    </MyButton>
  ) : likedScreamFunc() ? (
    <MyButton tip="Undo like" onClick={() => dispatch(unlikeScream(screamId))}>
      <FavoriteIcon color="primary" />
    </MyButton>
  ) : (
    <MyButton tip="Like" onClick={() => dispatch(likeScream(screamId))}>
      <FavoriteBorder color="primary" />
    </MyButton>
  );

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
        <Typography variant="body2" color="textSecondary">
          {dayjs(createdAt).fromNow()}
        </Typography>
        <Typography variant="body1">{body}</Typography>
        {likeButton}
        <span>{likeCount} likes</span>
        <MyButton tip="comments">
          <ChatIcon color="primary" />
        </MyButton>
        <span>{commentCount} comments</span>
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
