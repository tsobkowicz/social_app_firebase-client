import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory, Link } from 'react-router-dom';

// MUI components
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import { signupUser } from '../redux/actions/userActions';

// Icons and other stuff
import AppIcon from '../images/icon.png';

const useStyles = makeStyles({
  form: {
    textAlign: 'center',
  },
  image: {
    margin: '20px auto 20px auto',
  },
  pageTitle: {
    margin: '10px auto 10px auto',
  },
  textField: {
    margin: '10px auto 10px auto',
  },
  button: {
    marginTop: 20,
    position: 'relative',
  },
  customError: {
    color: 'red',
    fontSize: '0.8rem',
    marginTop: 10,
  },
  progress: {
    position: 'absolute',
  },
});

const Signup = () => {
  // React-router
  const history = useHistory();

  // Redux state
  const UI = useSelector((state) => state.UI);
  const { loading } = UI;
  const dispatch = useDispatch();

  // React component local state
  const [form, setForm] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    handle: '',
  });
  const [errors, setErrors] = useState({});
  const { email, password, confirmPassword, handle } = form;

  // MUI styling
  const classes = useStyles();

  // side effects
  // connect redux state to react component local state
  useEffect(() => {
    setErrors(UI.errors);
  }, [UI.errors]);

  // handlers
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newUserData = {
      email,
      password,
      confirmPassword,
      handle,
    };
    dispatch(signupUser(newUserData, history));
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <Grid container className={classes.form}>
      <Grid item sm />
      <Grid item sm>
        <img src={AppIcon} alt="monkey" className={classes.image} />
        <Typography variant="h2" className={classes.pageTitle}>
          Signup
        </Typography>
        {/* Add noValidate becouse html in default wants to valideate email field */}
        <form noValidate onSubmit={handleSubmit}>
          <TextField
            id="email"
            name="email"
            type="email"
            label="email"
            value={email}
            helperText={errors?.email}
            error={!!errors?.email}
            onChange={handleChange}
            fullWidth
            className={classes.textField}
          />
          <TextField
            id="password"
            name="password"
            type="password"
            label="password"
            value={password}
            helperText={errors?.password}
            error={!!errors?.password}
            onChange={handleChange}
            fullWidth
            className={classes.textField}
          />
          <TextField
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            label="confirm password"
            value={confirmPassword}
            helperText={errors?.confirmPassword}
            error={!!errors?.confirmPassword}
            onChange={handleChange}
            fullWidth
            className={classes.textField}
          />
          <TextField
            id="handle"
            name="handle"
            type="text"
            label="handle"
            value={handle}
            helperText={errors?.handle}
            error={!!errors?.handle}
            onChange={handleChange}
            fullWidth
            className={classes.textField}
          />
          {errors?.general && (
            <Typography variant="body2" className={classes.customError}>
              {errors?.general}
            </Typography>
          )}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.button}
            disabled={loading}
          >
            Signup
            {loading && (
              <CircularProgress size={30} className={classes.progress} />
            )}
          </Button>
          <br />
          <small>
            Already have an account ? login <Link to="/login">here</Link>
          </small>
        </form>
      </Grid>
      <Grid item sm />
    </Grid>
  );
};

export default Signup;
