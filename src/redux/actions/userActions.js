import axios from 'axios';

import {
  SET_USER,
  SET_ERRORS,
  CLEAR_ERRORS,
  LOADING_UI,
  SET_UNAUTHENTICATED,
} from '../types';

// Helper functions
const setAuthorizationHeader = (token) => {
  const FBIdToken = `Bearer ${token}`;
  localStorage.setItem('FBIdToken', FBIdToken);
  // eslint-disable-next-line dot-notation
  axios.defaults.headers.common.Authorization = FBIdToken;
};

// Actions
export const getUserData = () => async (dispatch) => {
  try {
    const { data } = await axios.get('/user');
    dispatch({
      type: SET_USER,
      payload: data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const loginUser = (userData, history) => async (dispatch) => {
  dispatch({ type: LOADING_UI });
  try {
    const { data } = await axios.post('/login', userData);
    setAuthorizationHeader(data.token);
    dispatch(getUserData());
    dispatch({ type: CLEAR_ERRORS });
    history.push('/');
  } catch (err) {
    dispatch({
      type: SET_ERRORS,
      payload: err.response.data,
    });
  }
};

export const signupUser = (newUserData, history) => async (dispatch) => {
  dispatch({ type: LOADING_UI });
  try {
    const { data } = await axios.post('/signup', newUserData);
    setAuthorizationHeader(data.token);
    dispatch(getUserData());
    dispatch({ type: CLEAR_ERRORS });
    history.push('/');
  } catch (err) {
    dispatch({
      type: SET_ERRORS,
      payload: err.response.data,
    });
  }
};

export const logoutUser = () => (dispatch) => {
  localStorage.removeItem('FBIdToken');
  delete axios.defaults.common.Authorization;
  dispatch({ type: SET_UNAUTHENTICATED });
};
