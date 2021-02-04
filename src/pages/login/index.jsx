import React from 'react';

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

import { getConfig } from '../../../config';

import { useStyles } from './style';

// TODO: Add session expired message (maybe use router state)

const redirectUrl = getConfig().SPOTIFY_AUTHORIZE_URL;
const clientId = process.env.SPOTIFY_CLIENT_ID;

const SCOPE = 'user-read-private user-read-email';
const redirectUri = process.env.NODE_ENV === 'development' ? 'http://localhost:9000/home' : 'https://iregiani.github.io/spotify-weather/home';

const redirect = () => {
  redirectUrl.searchParams.append('response_type', 'token');
  redirectUrl.searchParams.append('client_id', encodeURIComponent(clientId));
  redirectUrl.searchParams.append('scope', encodeURIComponent(SCOPE));
  redirectUrl.searchParams.append('redirect_uri', redirectUri);
  window.location = redirectUrl.toString();
};

const Login = () => {
  const classes = useStyles();

  return (
    <Grid container component="main" className={classes.root}>
      <Button color="primary" id="authButton" onClick={redirect}>
        {/* WIP: Add spotify icon */}
        Connect With Spotify
      </Button>
    </Grid>
  );
};

export default Login;
