import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

// Icons, images, ets.
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import { likeScream, unlikeScream } from '../../redux/actions/dataActions';

// components, utils
import MyButton from '../../util/MyButton';

const LikeButton = ({ screamId }) => {
  // Redux
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { authenticated } = user;

  // Custom functions
  // check if the user already like this scream
  const likedScreamFunc = () => {
    if (user?.likes.find((like) => like.screamId === screamId)) {
      return true;
    }
    return false;
  };
  // Logic for the like button
  // eslint-disable-next-line no-nested-ternary
  const likeButton = !authenticated ? (
    <Link to="/login">
      <MyButton tip="Like">
        <FavoriteBorder color="primary" />
      </MyButton>
    </Link>
  ) : likedScreamFunc() ? (
    <MyButton tip="Undo like" onClick={() => dispatch(unlikeScream(screamId))}>
      <FavoriteIcon color="primary" />
    </MyButton>
  ) : (
    <MyButton tip="Like" onClick={() => dispatch(likeScream(screamId))}>
      <FavoriteBorder color="primary" />
    </MyButton>
  );
  return likeButton;
};

LikeButton.propTypes = {
  screamId: PropTypes.string.isRequired,
};

export default LikeButton;
