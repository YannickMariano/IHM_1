import { useState } from 'react';
// import { useSelector } from 'react-redux';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
  Box,
  Button,
  Checkbox,
  // Divider,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  TextField
  // useMediaQuery
} from '@mui/material';

// import { IconChecks } from '@tabler/icons';
// import { IconChecks} from '@tabler/icons'

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project imports
// import useScriptRef from 'hooks/useScriptRef';
import AnimateButton from 'components/@extended/AnimateButton';

// assets
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// import { FontAwesomeIcon } from '../../../../node_modules/@fortawesome/react-fontawesome/index';
// import { faSquareCheck } from '../../../../node_modules/@fortawesome/free-solid-svg-icons/index';
import { Snackbar, Alert } from '@mui/material';
// import AOS from 'aos';
// import 'aos/dist/aos.css';

// import Google from 'assets/images/icons/social-google.svg';

// ============================|| FIREBASE - LOGIN ||============================ //

const FirebaseLogin = ({ ...others }) => {
  const theme = useTheme();
  // const scriptedRef = useScriptRef();
  const [checked, setChecked] = useState(true);
  const [showmdp, setShowmdp] = useState(true);
  const [username, setUsername] = useState('');
  const [mdp, setMdp] = useState('');
  const [currentUser, setCurrentUser] = useState();
  // const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  // const [showMessageConnection, setShowMessageConnection] = useState(false);
  const [connectionError, setConnectionError] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const naviguer = useNavigate();

  const handleClickShowmdp = () => {
    setShowmdp(!showmdp);
  };

  const handleMouseDownmdp = (event) => {
    event.preventDefault();
  };

  const handleFocus = () => {
    setShowErrorMessage(false);
    setConnectionError(false);
  };

  // useEffect(() => {
  //   AOS.init({ duration: 1500 });
  // }, []);

  // useEffect(()=>{
  //   if(key!=''){
  //     console.log(Cookies.get("jwt"));
  //     console.log(key);
  //     axios.get("http://127.0.0.1:8000/employer/user", {
  //       withCredentials: true,
  //       headers: {
  //           'Authorization': `Bearer ${Cookies.get("jwt")}`,
  //       },
  //     })
  //     .then((response)=>{
  //       setCurrentUser(true);
  //       localStorage.setItem('user', response.data);
  //       setCurrentUser(true);
  //     })
  //     .catch(function() {
  //       setCurrentUser(false);
  //     });
  //   }
  // },[key])

  function submitLogin() {
    // setShowMessageConnection(true);
    setShowErrorMessage(false);
    setConnectionError(false);
    axios
      .post('http://localhost:5000/login/login', {
        username: username,
        mdp: mdp
      })
      .then(function (response) {
        const user = response.data['user'];
        console.log(user);
        localStorage.setItem('user', user);
        setCurrentUser(true);
        setOpenSnackbar(true);
        setTimeout(() => {
          // setShowSuccessMessage(false); // Cache le message après un court délai (par exemple, 3 secondes ici)
        }, 2000);
      })
      .catch((error) => {
        console.log(error);
        setConnectionError(true);
        setShowErrorMessage(true);
        setTimeout(() => {
          setShowErrorMessage(false);
        }, 2800);
        // setShowMessageConnection(false);
      });
  }

  if (currentUser === true)
    setTimeout(() => {
      // setShowSuccessMessage(true);
    }, 1000);

  if (currentUser === true)
    setTimeout(() => {
      naviguer('/dashboard/default');
      window.location.reload();
    }, 1500);

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  return (
    <>
      <Formik
        autoComplete="off"
        validationSchema={Yup.object().shape({
          username: Yup.string().max(255).required('Username is required'),
          mdp: Yup.string().max(255).required('mdp is required')
        })}
        onSubmit={(values, { setErrors, setSubmitting }) => {
          try {
            handleLogin(values); // Appeler la fonction handleLogin avec les valeurs du formulaire
          } catch (err) {
            console.error(err);
            if (scriptedRef.current) {
              setErrors({ submit: err.message });
              setSubmitting(false);
            }
          }
        }}
      >
        {({ errors, handleBlur, isSubmitting }) => (
          <form noValidate onSubmit={submitLogin} {...others} autoComplete="off">
            <Grid item xs={12} sx={{ mb: 2 }}>
              <TextField
              
                fullWidth
                type="username"
                value={username}
                onFocus={handleFocus}
                name="username"
                error={connectionError}
                onBlur={handleBlur}
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
                label="Adresse username"
                sx={{ ...theme.typography.customInput }}
              />
            </Grid>
            {/* error={Boolean(touched.mdp && errors.mdp)} */}
            <FormControl fullWidth error={false} sx={{ ...theme.typography.customInput }}>
              <InputLabel htmlFor="outlined-adornment-mdp-login" style={{ color: connectionError && 'red' }}>
                Mot de passe
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-mdp-login"
                type={showmdp ? 'password' : 'mdp'}
                value={mdp}
                name="mdp"
                error={connectionError}
                onFocus={handleFocus}
                onBlur={handleBlur}
                onChange={(e) => {
                  setMdp(e.target.value);
                }}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle mdp visibility"
                      onClick={handleClickShowmdp}
                      onMouseDown={handleMouseDownmdp}
                      edge="end"
                      size="large"
                    >
                      {showmdp ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
                label="mdp"
                inputProps={{}}
              />
              {/* {showMessageConnection && (
                          <span className="mt-2" style={{width:"100%", textAlign:"center", color:"#5e3295", fontSize:"12px"}}>
                            {showSuccessMessage?<FontAwesomeIcon icon={faSquareCheck}/>:"Connexion..."}
                          </span>
                        )} */}
              <Snackbar
                open={openSnackbar}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }} // Centre le Snackbar horizontalement et le place en haut
                sx={{
                  '& .MuiSnackbarContent-root': {
                    // Applique le style au contenu du Snackbar
                    top: '5rem',
                    fontSize: '1.25rem' // Augmente la taille de la police
                  }
                }}
              >
                <Alert
                  onClose={handleCloseSnackbar}
                  severity="success"
                  sx={{
                    width: '100%',
                    fontSize: '1.25rem' // Taille de la police pour le texte de l'Alert
                  }}
                >
                  Connexion réussie. Bienvenue !
                </Alert>
              </Snackbar>
              {showErrorMessage && (
                <span className="mt-2" style={{ width: '100%', textAlign: 'center', color: 'red', fontSize: '12px' }}>
                  Erreur de connexion
                </span>
              )}
            </FormControl>

            <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1}>
              <FormControlLabel
                control={
                  <Checkbox checked={checked} onChange={(event) => setChecked(event.target.checked)} name="checked" color="primary" />
                }
                label="Se souvenir de moi"
              />
            </Stack>
            {errors.submit && (
              <Box sx={{ mt: 3 }}>
                <FormHelperText error>{errors.submit}</FormHelperText>
              </Box>
            )}

            <Box sx={{ mt: 2 }}>
              <AnimateButton>
                <Button
                  disableElevation
                  disabled={isSubmitting}
                  fullWidth
                  size="large"
                  variant="contained"
                  color="primary"
                  onClick={() => submitLogin()}
                >
                  Se connecter
                </Button>
              </AnimateButton>
            </Box>
          </form>
        )}
      </Formik>
    </>
  );
};

export default FirebaseLogin;
