import React, { useEffect, useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

import { loadUserProfile } from '../../api/spotify';
import { getWeatherByGeoLocation } from '../../api/openWeather';

import WeatherWidget from './components/WeatherWidget';

import { useStyles } from './style';

const TOKEN_KEY = 'TOKEN_KEY';

const fetchData = async (accessToken, history, setUserProfile, setWeatherInfo) => {
  let weatherPromise;

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (geoLoc) => { weatherPromise = getWeatherByGeoLocation(geoLoc); },
      // eslint-disable-next-line no-console
      (err) => { if (err.code === 1) weatherPromise = null; else console.error('Unable to get location', err); },
    );
  }

  // TODO: this should be Promise.all
  const profile = await loadUserProfile(accessToken).catch(({ status }) => (status === 401 || 400) && history.replace('login'));
  const weather = await weatherPromise;

  setUserProfile(profile);
  setWeatherInfo(weather);
  sessionStorage.setItem(TOKEN_KEY, accessToken);

  // removes the token from the URL
  if (profile && profile.email) history.replace('home');
};

const getAccessToken = ({ hash }) => hash.substring(14, hash.indexOf('&token_type'));

const Home = () => {
  const classes = useStyles();
  const location = useLocation();
  const history = useHistory();

  const [userProfile, setUserProfile] = useState({});
  const [weatherInfo, setWeatherInfo] = useState({});
  const accessToken = getAccessToken(location) || sessionStorage.getItem(TOKEN_KEY);

  console.log('weatherInfo', weatherInfo);
  console.log('userProfile', userProfile);

  useEffect(() => {
    fetchData(accessToken, history, setUserProfile, setWeatherInfo);
  }, []);


  return (
    <Grid container component="main" className={classes.root}>
      <span>
        Welcome
        {` ${userProfile.display_name}`}
      </span>
      <Button color="primary" id="authButton">
        Home
      </Button>
      <WeatherWidget weatherInfo={weatherInfo} setWeatherInfo={setWeatherInfo} />
    </Grid>
  );
};

export default Home;
