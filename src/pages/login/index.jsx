import React from 'react';
// import { useHistory } from 'react-router-dom';

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

import { useStyles } from './style';

const Login = () => {
  const classes = useStyles();
  // const history = useHistory(); TODO: After login

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(console.log, () => console.log('NOPE')); // save value to store
  }

  return (
    <Grid container component="main" className={classes.root}>
      <Button color="primary" id="forgotPasswordButton" onClick={() => {}}>
        Login With Spotify
      </Button>
    </Grid>
  );
};

export default Login;
