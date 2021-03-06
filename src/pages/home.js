import React, { useEffect } from 'react';

// MUI components
import Grid from '@material-ui/core/Grid';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import { getScreams } from '../redux/actions/dataActions';

// Components
import Scream from '../components/scream/Scream';
import Profile from '../components/profile/Profile';
import ScreamSkeleton from '../util/ScreamSkeleton';

const Home = () => {
  // Redux
  const data = useSelector((state) => state.data);
  const dispatch = useDispatch();
  const { screams, loading } = data;

  // Side effects
  useEffect(() => {
    dispatch(getScreams());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Logic
  const recentScreamsMarkup = !loading ? (
    /* eslint-disable prettier/prettier */
    screams.map((scream) => <Scream scream={scream} key={scream.screamId} />)
  ) : (
      <ScreamSkeleton />
    );
  /* eslint-enable prettier/prettier */

  return (
    <Grid container spacing={2}>
      <Grid item sm={8} xs={12}>
        {recentScreamsMarkup}
      </Grid>
      <Grid item sm={4} xs={12}>
        <Profile />
      </Grid>
    </Grid>
  );
};

export default Home;
