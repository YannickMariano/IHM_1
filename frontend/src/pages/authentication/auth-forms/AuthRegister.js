import { useState } from 'react';
// import { Link } from 'react-router-dom';
// import { useSelector } from 'react-redux';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  Grid,
  Divider,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
  // MenuItem,
  // Select,
  useMediaQuery,
} from '@mui/material';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project imports
// import useScriptRef from 'hooks/useScriptRef';
// import Google from 'assets/images/icons/social-google.svg';
import AnimateButton from 'components/@extended/AnimateButton';
import axios from 'axios';
import { useNavigate } from 'react-router';
// import { Link } from 'react-router-dom';
// import { strengthColor, strengthIndicator } from 'utils/password-strength';

// // assets
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Snackbar, Alert } from '@mui/material';

// ===========================|| FIREBASE - REGISTER ||=========================== //

const FirebaseRegister = ({ ...others }) => {
  const theme = useTheme();
  // const scriptedRef = useScriptRef();
  const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
  const [username, setUsername] = useState('');
  const [mdp, setMdp] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [currentUser, setCurrentUser] = useState();
  const [showPassword, setShowPassword] = useState(false);
  const [passwordConfirmed, setPasswordConfirmed] = useState(true);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  // const [successMessage, setSuccessMessage] = useState('');
  const naviguer = useNavigate()
  

  // useEffect(() => {
  //   axios.get("http://127.0.0.1:8000/employer/user")
  //   .then(function() {
  //     setCurrentUser(true);
  //   })
  //   .catch(function() {
  //     setCurrentUser(false);
  //   });
  // }, []);

  function submitRegistration() {
    if (mdp === confirmPassword) {
      axios.post("http://localhost:5000/login/signup", {
        username: username,
        mdp: mdp
      }).then(function () {
        console.log("Account created");
        setCurrentUser(true);
        setSnackbarMessage("Inscription réussie. Bienvenue !");
        setOpenSnackbar(true);
  
        // Retarder la redirection pour que l'utilisateur puisse voir le message
        setTimeout(() => {
          naviguer('/Login');
        }, 6500); // Ajustez ce délai au besoin
      }).catch(function (error) {
        console.log("Erreur lors de l'inscription", error);
        setSnackbarMessage("Erreur lors de l'inscription. Veuillez réessayer.");
        setOpenSnackbar(true);
      });
    } else {
      setPasswordConfirmed(false);
      setSnackbarMessage("Les mots de passe ne correspondent pas.");
      setOpenSnackbar(true);
    }
  }
  
  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  if(currentUser){
    console.log('voilaa le current user')
  }
  return (
    <>
    {/* {successMessage && (
          <Typography variant="success" sx={{ mb: 2 }}>
            {successMessage}
          </Typography>
        )} */}
      <Formik
      validationSchema={Yup.object().shape({
        username: Yup.string().max(255).required('Username is required'),
        mdp: Yup.string().max(255).required('mdp is required')
      })}
        
        onSubmit={async ({ setErrors, setSubmitting }) => {
          try {
            if (scriptedRef.current) {
              setSubmitting(false);
            }
          } catch (err) {
            console.error(err);
            if (scriptedRef.current) {
              setErrors({ submit: err.message });
              setSubmitting(false);
            }
          }
        }}
      >
        {({ errors, handleBlur, touched}) => (
          <form noValidate onSubmit={submitRegistration} {...others}>
           
            <Grid container spacing={matchDownSM ? 0 : 2}>
              <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Nom"
                    value={username}
                    margin="normal"
                    name="lname"
                    type="text"
                    defaultValue=""
                    onChange={(e)=> setUsername(e.target.value)}
                    sx={{ ...theme.typography.customInput }}
                  />
                </Grid>
              
           </Grid>
           <Divider className="mt-4 mb-2"/>

                <FormControl fullWidth error={Boolean(touched.password && errors.password)} sx={{ ...theme.typography.customInput, mb: 2 }}>
                      <InputLabel htmlFor="outlined-adornment-password-login">Mot de passe</InputLabel>
                      <OutlinedInput
                        id="outlined-adornment-password-login"
                        type={showPassword ? 'text' : 'password'}
                        value={mdp}
                        name="Mot de passe"
                        onBlur={handleBlur}
                        onChange={(e)=>{setMdp(e.target.value)}}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                              edge="end"
                              size="large"
                            >
                              {showPassword ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                          </InputAdornment>
                        }
                        label="Password"
                        inputProps={{}}
                      />
                      {touched.password && errors.password && (
                        <FormHelperText error id="standard-weight-helper-text-password-login">
                          {errors.password}
                        </FormHelperText>
                      )}
                      </FormControl>
                      <FormControl className="mt-3" fullWidth error={Boolean(touched.password && errors.password)} sx={{ ...theme.typography.customInput }}>
                      <InputLabel htmlFor="outlined-adornment-password-login">Confirmer le mot de passe</InputLabel>
                      <OutlinedInput
                        id="outlined-adornment-password-login-confirm"
                        type={showPassword ? 'text' : 'password'}
                        value={confirmPassword}
                        name="Mot de passe"
                        onBlur={handleBlur}
                        onChange={(e)=>{setConfirmPassword(e.target.value)}}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                              edge="end"
                              size="large"
                            >
                               {showPassword ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                          </InputAdornment>
                        }
                        label="Password"
                        inputProps={{}}
                      />
                      {!passwordConfirmed&&<FormHelperText error id="standard-weight-helper-text-password-login">
                          Les mots de passe ne correspondent pas
                      </FormHelperText>}
                      {touched.password && errors.password && (
                        <FormHelperText error id="standard-weight-helper-text-password-login">
                          {errors.password}
                        </FormHelperText>
                      )}
                      </FormControl>
            {errors.submit && (
              <Box sx={{ mt: 3 }}>
                <FormHelperText error>{errors.submit}</FormHelperText>
              </Box>
            )}

            <Box sx={{ mt: 2 }}>
              <AnimateButton>
                <Button 
                  onClick={()=>submitRegistration()}
                 disableElevation
                //  disabled={isSubmitting || Object.keys(errors).length > 0}
                 fullWidth size="large" 
                 variant="contained" 
                 
                 color="success">
                  Enregistrer
                </Button>
                <Snackbar
                open={openSnackbar}
                autoHideDuration={3000}
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
                  {snackbarMessage}
                </Alert>
              </Snackbar>
              </AnimateButton>
            </Box>
          </form>
        )}
      </Formik>
    </>
  );
};

export default FirebaseRegister;