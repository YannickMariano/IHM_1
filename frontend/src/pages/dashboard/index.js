import { useState } from 'react';

// material-ui
import {
  Avatar,
  AvatarGroup,
  Box,
  Button,
  Grid,
  List,
  ListItemAvatar,
  ListItemButton,
  ListItemSecondaryAction,
  ListItemText,
  MenuItem,
  Stack,
  TextField,
  Typography
} from '@mui/material';

// project import
import OrdersTable from './OrdersTable';
import IncomeAreaChart from './IncomeAreaChart';
import MonthlyBarChart from './MonthlyBarChart';
import ReportAreaChart from './ReportAreaChart';
import SalesColumnChart from './SalesColumnChart';
import MainCard from 'components/MainCard';
import AnalyticEcommerce from 'components/cards/statistics/AnalyticEcommerce';

// assets
import {  } from '@ant-design/icons';
import avatar1 from 'assets/images/users/avatar-1.png';
import avatar2 from 'assets/images/users/avatar-2.png';
import avatar3 from 'assets/images/users/avatar-3.png';
import avatar4 from 'assets/images/users/avatar-4.png';
import React, {useEffect} from 'react';
import { 
  UserOutlined, BookOutlined, 
  RiseOutlined, ClusterOutlined, 
  GiftOutlined, MessageOutlined, 
  SettingOutlined} 
  from '@ant-design/icons';


// avatar style
const avatarSX = {
  width: 36,
  height: 36,
  fontSize: '1rem'
};

// action style
const actionSX = {
  mt: 0.75,
  ml: 1,
  top: 'auto',
  right: 'auto',
  alignSelf: 'flex-start',
  transform: 'none'
};

// sales report status
const status = [
  {
    value: 'today',
    label: 'Today'
  },
  {
    value: 'month',
    label: 'This Month'
  },
  {
    value: 'year',
    label: 'This Year'
  }
];

// ==============================|| DASHBOARD - DEFAULT ||============================== //

const DashboardDefault = () => {
  const [value, setValue] = useState('today');
  const [slot, setSlot] = useState('week');
  const [donneesProf, setDonneesProf] = useState(0);
  const [parcours, setParcours] = useState(0);
  const [niveau, setNiveau] = useState(0);
  const [matiere, setMatiere] = useState(0);

  useEffect(() => {
    fetch('http://localhost:5000/prof/')
      .then((res) => res.json())
      .then((data) => {
        setDonneesProf(data.length);
      })
      .catch((error) => {
        console.error('Les prof ne sont pas recupérer dans le dashboard:', error);
      });
  }, []);

  useEffect(() => {
    fetch('http://localhost:5000/parcour/')
      .then((res) => res.json())
      .then((data) => {
        setParcours(data.length);
      })
      .catch((error) => {
        console.error('Les prof ne sont pas recupérer dans le dashboard:', error);
      });
  }, []);

  useEffect(() => {
    fetch('http://localhost:5000/niveau/')
      .then((res) => res.json())
      .then((data) => {
        setNiveau(data.length);
      })
      .catch((error) => {
        console.error('Les prof ne sont pas recupérer dans le dashboard:', error);
      });
  }, []);

  useEffect(() => {
    fetch('http://localhost:5000/matiere/')
      .then((res) => res.json())
      .then((data) => {
        setMatiere(data.length);
      })
      .catch((error) => {
        console.error('Les prof ne sont pas recupérer dans le dashboard:', error);
      });
  }, []);

  return (
    <Grid container rowSpacing={4.5} columnSpacing={2.75}>
      {/* row 1 */}
      <Grid item xs={12} sx={{ mb: -2.25 }}>
        <Typography variant="h5">Tableau de board</Typography>
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
      <AnalyticEcommerce 
        title="Nombre de Prof" 
        count={donneesProf.toString()}
        icon={<UserOutlined style={{ fontSize: '1.5rem' }} />} // Icône plus grande
        sx={{
          '.MuiTypography-h4': {
            fontSize: '3rem', // Taille de police plus grande pour le nombre
            color: 'primary', // Couleur de la police pour le nombre
          },
          '.MuiTypography-h6': {
            fontWeight: 'bold', // Titre en gras
            fontSize: '1.25rem' // Taille de police plus grande pour le titre
          },
          '.MuiAvatar-root': {
            width: 56, // Largeur de l'avatar
            height: 56, // Hauteur de l'avatar
            bgcolor: 'purple', // Couleur de fond de l'avatar
          }
        }}
      />
        
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
      <AnalyticEcommerce 
  title="Nombre de parcours" 
  count={parcours.toString()}
  icon={<ClusterOutlined style={{ fontSize: '1.5rem' }} />} // Icône plus grande
  sx={{
    '.MuiTypography-h4': {
      fontSize: '3rem', // Taille de police plus grande pour le nombre
      color: 'primary', // Couleur de la police pour le nombre
    },
    '.MuiTypography-h6': {
      fontWeight: 'bold', // Titre en gras
      fontSize: '1.25rem' // Taille de police plus grande pour le titre
    },
    '.MuiAvatar-root': {
      width: 56, // Largeur de l'avatar
      height: 56, // Hauteur de l'avatar
      bgcolor: '#f0d733', // Couleur de fond de l'avatar
    }
  }}
/>
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
      <AnalyticEcommerce 
  title="Nombre de niveau" 
  count={niveau.toString()}
  icon={<RiseOutlined style={{ fontSize: '1.5rem' }} />} // Icône plus grande
  sx={{
    '.MuiTypography-h4': {
      fontSize: '3rem', // Taille de police plus grande pour le nombre
      color: 'primary', // Couleur de la police pour le nombre
    },
    '.MuiTypography-h6': {
      fontWeight: 'bold', // Titre en gras
      fontSize: '1.25rem' // Taille de police plus grande pour le titre
    },
    '.MuiAvatar-root': {
      width: 56, // Largeur de l'avatar
      height: 56, // Hauteur de l'avatar
      bgcolor: '#3de087', // Couleur de fond de l'avatar
    }
  }}
/>
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
      <AnalyticEcommerce 
  title="Nombre de matière" 
  count={matiere.toString()}
  icon={<BookOutlined style={{ fontSize: '1.5rem' }} />} // Icône plus grande
  sx={{
    '.MuiTypography-h4': {
      fontSize: '3rem', // Taille de police plus grande pour le nombre
      color: 'primary', // Couleur de la police pour le nombre
    },
    '.MuiTypography-h6': {
      fontWeight: 'bold', // Titre en gras
      fontSize: '1.25rem' // Taille de police plus grande pour le titre
    },
    '.MuiAvatar-root': {
      width: 56, // Largeur de l'avatar
      height: 56, // Hauteur de l'avatar
      bgcolor: 'red', // Couleur de fond de l'avatar
    }
  }}
/>
      </Grid>

      <Grid item md={8} sx={{ display: { sm: 'none', md: 'block', lg: 'none' } }} />

      {/* row 2 */}
      <Grid item xs={12} md={7} lg={8}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <Typography variant="h5">Unique Visitor</Typography>
          </Grid>
          <Grid item>
            <Stack direction="row" alignItems="center" spacing={0}>
              <Button
                size="small"
                onClick={() => setSlot('month')}
                color={slot === 'month' ? 'primary' : 'secondary'}
                variant={slot === 'month' ? 'outlined' : 'text'}
              >
                Month
              </Button>
              <Button
                size="small"
                onClick={() => setSlot('week')}
                color={slot === 'week' ? 'primary' : 'secondary'}
                variant={slot === 'week' ? 'outlined' : 'text'}
              >
                Week
              </Button>
            </Stack>
          </Grid>
        </Grid>
        <MainCard content={false} sx={{ mt: 1.5 }}>
          <Box sx={{ pt: 1, pr: 2 }}>
            <IncomeAreaChart slot={slot} />
          </Box>
        </MainCard>
      </Grid>
      <Grid item xs={12} md={5} lg={4}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <Typography variant="h5">Income Overview</Typography>
          </Grid>
          <Grid item />
        </Grid>
        <MainCard sx={{ mt: 2 }} content={false}>
          <Box sx={{ p: 3, pb: 0 }}>
            <Stack spacing={2}>
              <Typography variant="h6" color="textSecondary">
                This Week Statistics
              </Typography>
              <Typography variant="h3">$7,650</Typography>
            </Stack>
          </Box>
          <MonthlyBarChart />
        </MainCard>
      </Grid>

      {/* row 3 */}
      <Grid item xs={12} md={7} lg={8}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <Typography variant="h5">Recent Orders</Typography>
          </Grid>
          <Grid item />
        </Grid>
        <MainCard sx={{ mt: 2 }} content={false}>
          <OrdersTable />
        </MainCard>
      </Grid>
      <Grid item xs={12} md={5} lg={4}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <Typography variant="h5">Analytics Report</Typography>
          </Grid>
          <Grid item />
        </Grid>
        <MainCard sx={{ mt: 2 }} content={false}>
          <List sx={{ p: 0, '& .MuiListItemButton-root': { py: 2 } }}>
            <ListItemButton divider>
              <ListItemText primary="Company Finance Growth" />
              <Typography variant="h5">+45.14%</Typography>
            </ListItemButton>
            <ListItemButton divider>
              <ListItemText primary="Company Expenses Ratio" />
              <Typography variant="h5">0.58%</Typography>
            </ListItemButton>
            <ListItemButton>
              <ListItemText primary="Business Risk Cases" />
              <Typography variant="h5">Low</Typography>
            </ListItemButton>
          </List>
          <ReportAreaChart />
        </MainCard>
      </Grid>

      {/* row 4 */}
      <Grid item xs={12} md={7} lg={8}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <Typography variant="h5">Sales Report</Typography>
          </Grid>
          <Grid item>
            <TextField
              id="standard-select-currency"
              size="small"
              select
              value={value}
              onChange={(e) => setValue(e.target.value)}
              sx={{ '& .MuiInputBase-input': { py: 0.5, fontSize: '0.875rem' } }}
            >
              {status.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
        </Grid>
        <MainCard sx={{ mt: 1.75 }}>
          <Stack spacing={1.5} sx={{ mb: -12 }}>
            <Typography variant="h6" color="secondary">
              Net Profit
            </Typography>
            <Typography variant="h4">$1560</Typography>
          </Stack>
          <SalesColumnChart />
        </MainCard>
      </Grid>
      <Grid item xs={12} md={5} lg={4}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <Typography variant="h5">Transaction History</Typography>
          </Grid>
          <Grid item />
        </Grid>
        <MainCard sx={{ mt: 2 }} content={false}>
          <List
            component="nav"
            sx={{
              px: 0,
              py: 0,
              '& .MuiListItemButton-root': {
                py: 1.5,
                '& .MuiAvatar-root': avatarSX,
                '& .MuiListItemSecondaryAction-root': { ...actionSX, position: 'relative' }
              }
            }}
          >
            <ListItemButton divider>
              <ListItemAvatar>
                <Avatar
                  sx={{
                    color: 'success.main',
                    bgcolor: 'success.lighter'
                  }}
                >
                  <GiftOutlined />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={<Typography variant="subtitle1">Order #002434</Typography>} secondary="Today, 2:00 AM" />
              <ListItemSecondaryAction>
                <Stack alignItems="flex-end">
                  <Typography variant="subtitle1" noWrap>
                    + $1,430
                  </Typography>
                  <Typography variant="h6" color="secondary" noWrap>
                    78%
                  </Typography>
                </Stack>
              </ListItemSecondaryAction>
            </ListItemButton>
            <ListItemButton divider>
              <ListItemAvatar>
                <Avatar
                  sx={{
                    color: 'primary.main',
                    bgcolor: 'primary.lighter'
                  }}
                >
                  <MessageOutlined />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={<Typography variant="subtitle1">Order #984947</Typography>} secondary="5 August, 1:45 PM" />
              <ListItemSecondaryAction>
                <Stack alignItems="flex-end">
                  <Typography variant="subtitle1" noWrap>
                    + $302
                  </Typography>
                  <Typography variant="h6" color="secondary" noWrap>
                    8%
                  </Typography>
                </Stack>
              </ListItemSecondaryAction>
            </ListItemButton>
            <ListItemButton>
              <ListItemAvatar>
                <Avatar
                  sx={{
                    color: 'error.main',
                    bgcolor: 'error.lighter'
                  }}
                >
                  <SettingOutlined />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={<Typography variant="subtitle1">Order #988784</Typography>} secondary="7 hours ago" />
              <ListItemSecondaryAction>
                <Stack alignItems="flex-end">
                  <Typography variant="subtitle1" noWrap>
                    + $682
                  </Typography>
                  <Typography variant="h6" color="secondary" noWrap>
                    16%
                  </Typography>
                </Stack>
              </ListItemSecondaryAction>
            </ListItemButton>
          </List>
        </MainCard>
        <MainCard sx={{ mt: 2 }}>
          <Stack spacing={3}>
            <Grid container justifyContent="space-between" alignItems="center">
              <Grid item>
                <Stack>
                  <Typography variant="h5" noWrap>
                    Help & Support Chat
                  </Typography>
                  <Typography variant="caption" color="secondary" noWrap>
                    Typical replay within 5 min
                  </Typography>
                </Stack>
              </Grid>
              <Grid item>
                <AvatarGroup sx={{ '& .MuiAvatar-root': { width: 32, height: 32 } }}>
                  <Avatar alt="Remy Sharp" src={avatar1} />
                  <Avatar alt="Travis Howard" src={avatar2} />
                  <Avatar alt="Cindy Baker" src={avatar3} />
                  <Avatar alt="Agnes Walker" src={avatar4} />
                </AvatarGroup>
              </Grid>
            </Grid>
            <Button size="small" variant="contained" sx={{ textTransform: 'capitalize' }}>
              Need Help?
            </Button>
          </Stack>
        </MainCard>
      </Grid>
    </Grid>
  );
};

export default DashboardDefault;
