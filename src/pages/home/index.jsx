import React, { useEffect, useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';

// import Grid from '@material-ui/core/Grid';

import { loadUserProfile } from '../../api/spotify';
import { getWeatherByGeoLocation } from '../../api/openWeather';

import WeatherWidget from './components/WeatherWidget';
import PlaylistWidget from './components/PlaylistsWidget';
import PlayerWidget from './components/PlayerWidget';
import CustomPlaylist from './components/CustomPlaylist';

// import { useStyles } from './style';
// TODO: Add logout and burn token + cookie

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
  // const classes = useStyles();
  const location = useLocation();
  const history = useHistory();

  const [userProfile, setUserProfile] = useState({});
  const [weatherInfo, setWeatherInfo] = useState({});
  const [customPlaylist, setCustomPlaylist] = useState([]); // this could be a Set
  const [currentPlaylist, setCurrentPlaylist] = useState({});
  const accessToken = getAccessToken(location) || sessionStorage.getItem(TOKEN_KEY);

  const updateCustomPlaylist = {
    removeTrack: ({ id }) => setCustomPlaylist((previousList) => {
      const index = previousList.findIndex((item) => item.id === id);
      const newList = [...previousList];
      newList.splice(index, 1);
      return index > -1 ? newList : [...previousList];
    }),
    addTrack: (track) => setCustomPlaylist((previousList) => [...previousList, track]),
  };

  useEffect(() => {
    fetchData(accessToken, history, setUserProfile, setWeatherInfo);
  }, []);

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '2', gridTemplateRows: '1' }}>
      <div style={{ gridColumn: '1' }}>
        <PlayerWidget currentPlaylist={currentPlaylist} accessToken={accessToken} updateCustomPlaylist={updateCustomPlaylist} customPlaylist={customPlaylist} />
      </div>
      <div style={{ gridColumn: '2' }}>
        <CustomPlaylist accessToken={accessToken} updatePlaylist={updateCustomPlaylist} playlist={customPlaylist} userProfile={userProfile} />
        <WeatherWidget weatherInfo={weatherInfo} setWeatherInfo={setWeatherInfo} />
        <PlaylistWidget weatherInfo={weatherInfo} setCurrentPlaylist={setCurrentPlaylist} accessToken={accessToken} />
      </div>
    </div>
  );
};

export default Home;
