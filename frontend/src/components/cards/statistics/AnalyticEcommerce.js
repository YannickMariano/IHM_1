// import PropTypes from 'prop-types';

// material-ui
import { Chip, Grid, Stack, Typography } from '@mui/material';

// project import
import MainCard from 'components/MainCard';

// assets
import { RiseOutlined, FallOutlined } from '@ant-design/icons';

// ==============================|| STATISTICS - ECOMMERCE CARD  ||============================== //

// Définition des styles personnalisés
const shadowBoxStyle = {
  boxShadow: '0px 0px 10px rgba(0, 0.1, 0.1, 0.1)', // Définition de l'ombre
  padding: '16px', // Ajout d'un padding pour l'espace intérieur
  borderRadius: '5px', // Bord arrondi pour la boîte d'ombre
};

// Composant fonctionnel
const AnalyticEcommerce = ({ color, title, count, percentage, isLoss }) => {
  return (
    <MainCard contentSX={{ p: 2.25 }} style={shadowBoxStyle}>
        <Stack spacing={0.5} >
          <Typography variant="h5" color="blue">
            {title}
          </Typography>
          <Grid container alignItems="center">
            <Grid item>
              <Typography variant="h3" color="red">
                {count}
              </Typography>
            </Grid>
            {percentage && (
              <Grid item>
                <Chip
                  variant="combined"
                  color={color}
                  icon={
                    <>
                      {!isLoss && <RiseOutlined style={{ fontSize: '0.75rem', color: 'inherit' }} />}
                      {isLoss && <FallOutlined style={{ fontSize: '0.75rem', color: 'inherit' }} />}
                    </>
                  }
                  label={`${percentage}%`}
                  sx={{ ml: 1.25, pl: 1 }}
                  size="small"
                />
              </Grid>
            )}
          </Grid>
        </Stack>  
      </MainCard>
  );
};

export default AnalyticEcommerce;