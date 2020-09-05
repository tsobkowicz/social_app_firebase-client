import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

// MUI components
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';

// Icons, images, etc.
import AddIcon from '@material-ui/icons/Add';
import HomeIcon from '@material-ui/icons/Home';
import Notifications from '@material-ui/icons/Notifications';

// Redux
import { useSelector } from 'react-redux';

// Util
import MyButton from '../util/MyButton';

const useStyles = makeStyles({
  toolbar: {
    margin: 'auto',
    '& svg': {
      color: '#fff',
    },
  },
});

const Navbar = () => {
  // MUI styling
  const classes = useStyles();

  // Redux state
  const authenticated = useSelector((state) => state.user.authenticated);

  return (
    <AppBar>
      <Toolbar className={classes.toolbar}>
        {authenticated ? (
          <>
            <MyButton tip="Post a scream">
              <AddIcon />
            </MyButton>
            <Link to="/">
              <MyButton tip="Home">
                <HomeIcon />
              </MyButton>
            </Link>
            <MyButton tip="Notifications">
              <Notifications />
            </MyButton>
          </>
        ) : (
          <>
            <Button color="inherit" component={Link} to="/">
              Home
            </Button>
            <Button color="inherit" component={Link} to="/login">
              Login
            </Button>
            <Button color="inherit" component={Link} to="/signup">
              Signup
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
