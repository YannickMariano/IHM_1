import React from 'react';
import { Button, Grid } from '@mui/material';
import { Link } from 'react-router-dom';

const FirebaseLogin = () => {
  // const history = useHistory();

  // const handleRedirect = (path) => {
    // history.push(path);
  // }; 

  return (
    <Grid container spacing={2} direction="column">
      <Grid item>
        <Link to="/admin" style={{ textDecoration: 'none' }}>
            <Button variant="contained" fullWidth>
            Admin
            </Button>
        </Link>
      </Grid>

      <Grid item>
        <Link to="/prof" style={{ textDecoration: 'none' }}>
            <Button variant="contained" fullWidth>
            Professeur
            </Button>
        </Link>
      </Grid>

      <Grid item>
        <Link to="/eleve" style={{ textDecoration: 'none' }}>
            <Button variant="contained" fullWidth>
            Eleve
            </Button>
        </Link>
      </Grid>
    </Grid>
  );
};

export default FirebaseLogin;
