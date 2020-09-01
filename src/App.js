import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import './App.css';
import jwtDecode from 'jwt-decode';

// Components
import Navbar from './components/Navbar';
import AuthRoute from './util/AuthRoute';

// Import pages components
import Home from './pages/home';
import Login from './pages/login';
import Signup from './pages/signup';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#33c9dc',
      main: '#00bcd4',
      dark: '#008394',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff6333',
      main: '#ff3d00',
      dark: '#0b22a00',
      contrastText: '#fff',
    },
  },
});

let authenticated;
const token = localStorage.FBIdToken;
if (token) {
  const decodedToken = jwtDecode(token);
  if (decodedToken.exp * 1000 < Date.now()) {
    window.location.href = '/login';
    authenticated = false;
  } else {
    authenticated = true;
  }
}

const App = () => (
  <ThemeProvider theme={theme}>
    <div className="App">
      <Router>
        <Navbar />
        <div className="container">
          <Switch>
            <Route exact path="/" component={Home} />
            <AuthRoute
              exact
              path="/login"
              component={Login}
              authenticated={authenticated}
            />
            <AuthRoute
              exact
              path="/signup"
              component={Signup}
              authenticated={authenticated}
            />
          </Switch>
        </div>
      </Router>
    </div>
  </ThemeProvider>
);

export default App;
