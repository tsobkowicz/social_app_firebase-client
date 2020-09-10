import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
// MUI
import Grid from '@material-ui/core/Grid';
// Redux
import { useSelector, useDispatch } from 'react-redux';
import { getUserData } from '../redux/actions/dataActions';
// Components
import Scream from '../components/scream/Scream';
import StaticProfile from '../components/profile/StaticProfile';

const User = () => {
  // React local state
  const [profile, setProfile] = useState(null);
  const [screamIdParam, setScreamIdParam] = useState(null);
  // React router
  // check for params in URL
  const { handle } = useParams();
  const { screamId } = useParams();

  // Redux state
  const data = useSelector((state) => state.data);
  const { screams, loading } = data;
  const dispatch = useDispatch();

  // Side effects
  useEffect(() => {
    if (screamId) setScreamIdParam(screamId);
    dispatch(getUserData(handle));
    const fetchUserHandle = async () => {
      try {
        const result = await axios.get(`/user/${handle}`);
        setProfile(result.data.user);
      } catch (err) {
        console.log(err);
      }
    };
    fetchUserHandle();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // logic
  // eslint-disable-next-line no-nested-ternary
  const screamsMarkup = loading ? (
    <p>Loading data...</p>
  ) : // eslint-disable-next-line no-nested-ternary
  screams === null ? (
    <p>No screams from this user</p>
  ) : !screamIdParam ? (
    screams.map((scream) => <Scream key={scream.screamId} scream={scream} />)
  ) : (
    screams.map((scream) => {
      if (scream.screamId !== screamIdParam) {
        return <Scream key={scream.screamId} scream={scream} />;
      }
      return <Scream key={scream.screamId} scream={scream} openDialog />;
    })
  );

  return (
    <Grid container spacing={2}>
      <Grid item sm={8} xs={12}>
        {screamsMarkup}
      </Grid>
      <Grid item sm={4} xs={12}>
        {profile === null ? (
          <p>Loading profile...</p>
        ) : (
          <StaticProfile profile={profile} />
        )}
      </Grid>
    </Grid>
  );
};

export default User;
