import { Link } from 'react-router-dom';

// material-ui
import { Grid, Stack, Typography, Button } from '@mui/material';

// project import
import ProfLogin from './auth-forms/ProfLogin';
import AuthWrapper from './AuthWrapper';

// ================================|| LOGIN ||================================ //

const Login = () => (
  <AuthWrapper>
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Stack direction="row" justifyContent="space-between" alignItems="baseline" sx={{ mb: { xs: -0.5, sm: 0.5 } }}>
          <Typography variant="h3">Se connecter</Typography>
          <Typography component={Link} to="/ProfRegister" variant="body1" sx={{ textDecoration: 'none' }} color="primary">
            {/* Eto ilay redirection ry Nicky aaa */}
            Vous n&apos;avez pas encore de compte?
          </Typography>
        </Stack>
      </Grid>
      <Grid item xs={12}>
        <ProfLogin />
      </Grid>
    </Grid>
    <br></br>
    <Link to="/accueil" style={{ textDecoration: 'none' }}>
      <Button variant=""  style={{ fontSize: '0.8rem' }}>
        Retour
      </Button>
    </Link>
  </AuthWrapper>
);

export default Login;
