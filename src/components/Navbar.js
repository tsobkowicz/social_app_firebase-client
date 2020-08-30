import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

// MUI components
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles({
  toolbar: {
    margin: 'auto',
  },
});

const Navbar = () => {
  const classes = useStyles();
  return (
    <AppBar>
      <Toolbar className={classes.toolbar}>
        <Button color="inherit" component={Link} to="/">
          Home
        </Button>
        <Button color="inherit" component={Link} to="/login">
          Login
        </Button>
        <Button color="inherit" component={Link} to="/signup">
          Signup
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
