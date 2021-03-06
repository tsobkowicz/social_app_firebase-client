import axios from 'axios';

import {
  SET_USER,
  SET_ERRORS,
  CLEAR_ERRORS,
  LOADING_UI,
  SET_UNAUTHENTICATED,
  LOADING_USER,
  MARK_NOTIFICATIONS_READ,
} from '../types';

// Helper functions
const setAuthorizationHeader = (token) => {
  const FBIdToken = `Bearer ${token}`;
  localStorage.setItem('FBIdToken', FBIdToken);
  axios.defaults.headers.common.Authorization = FBIdToken;
};

// Actions
export const getUserData = () => async (dispatch) => {
  dispatch({ type: LOADING_USER });
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
  delete axios.defaults.headers.common.Authorization;
  dispatch({ type: SET_UNAUTHENTICATED });
};

export const uploadImage = (formData) => async (dispatch) => {
  dispatch({ type: LOADING_USER });
  try {
    await axios.post('/user/image', formData);
    dispatch(getUserData());
  } catch (err) {
    console.log(err);
  }
};

export const editUserDetails = (userDetails) => async (dispatch) => {
  dispatch({ type: LOADING_USER });
  try {
    await axios.post('/user', userDetails);
    dispatch(getUserData());
  } catch (err) {
    console.log(err);
  }
};

export const markNotificationsRead = (notificationIds) => async (dispatch) => {
  try {
    await axios.post('notifications', notificationIds);
    dispatch({ type: MARK_NOTIFICATIONS_READ });
  } catch (err) {
    console.log(err);
  }
};
