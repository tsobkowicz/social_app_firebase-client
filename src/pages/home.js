import React, { useState, useEffect } from 'react';

// MUI components
import Grid from '@material-ui/core/Grid';
import axios from 'axios';

// Components
import Scream from '../components/Scream';
import Profile from '../components/Profile';

const Home = () => {
  const [screams, setScreams] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`/screams`);
        setScreams(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  const RecentScreamsMarkup = screams ? (
    /* eslint-disable prettier/prettier */
    screams.map((scream) => <Scream scream={scream} key={scream.screamId} />)
  ) : (
      <p>Loading...</p>
    );
  /* eslint-enable prettier/prettier */

  return (
    <Grid container spacing={2}>
      <Grid item sm={8} xs={12}>
        {RecentScreamsMarkup}
      </Grid>
      <Grid item sm={4} xs={12}>
        <Profile />
      </Grid>
    </Grid>
  );
};

export default Home;
