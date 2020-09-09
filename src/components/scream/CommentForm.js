import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

// MUI
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import { submitComment } from '../../redux/actions/dataActions';

const useStyles = makeStyles({
  textField: {
    margin: '10px auto 10px auto',
  },
  visibleSeparator: {
    width: '100%',
    borderBottom: '1px solid rgba(0,0,0,0.1)',
    marginBottom: 20,
  },
});

const CommentForm = ({ screamId }) => {
  // React local state
  const [body, setBody] = useState('');
  const [errors, setErrors] = useState({});

  // Redux state
  const UI = useSelector((state) => state.UI);
  const commentCount = useSelector((state) => state.data.scream.commentCount);
  const authenticated = useSelector((state) => state.user.authenticated);
  const dispatch = useDispatch();

  // MUI
  const classes = useStyles();

  // side effects
  useEffect(() => {
    if (UI.errors) {
      setErrors(UI.errors);
    }
    if (!UI.errors && !UI.loading) {
      setBody('');
      setErrors({});
    }
  }, [UI.errors, UI.loading, commentCount]);

  // handlers
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(submitComment(screamId, { body }));
  };
  const handleChange = (e) => {
    setBody(e.target.value);
  };

  // logic
  const commentFormMarkup = authenticated ? (
    <Grid item sm={12} style={{ textAlign: 'center' }}>
      <form onSubmit={handleSubmit}>
        <TextField
          name="body"
          type="text"
          label="Comment on scream"
          error={!!errors?.comment}
          helperText={errors?.comment}
          value={body}
          onChange={handleChange}
          fullWidth
          className={classes.textField}
        />
        <Button type="submit" color="primary" className={classes.button}>
          Submit
        </Button>
      </form>
      <hr className={classes.visibleSeparator} />
    </Grid>
  ) : null;

  return commentFormMarkup;
};

CommentForm.propTypes = {
  screamId: PropTypes.string.isRequired,
};

export default CommentForm;
