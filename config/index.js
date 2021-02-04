const SPOTIFY_URL = new URL('https://api.spotify.com/v1/');
const SPOTIFY_URL_VERSION = 'v1';
SPOTIFY_URL.addPath = (path) => { SPOTIFY_URL.pathname = `${SPOTIFY_URL_VERSION}/${path}`; };

const baseUrls = {
  SPOTIFY_URL,
  SPOTIFY_AUTHORIZE_URL: new URL('https://accounts.spotify.com/authorize'),
  OPEN_WEATHER_URL: new URL('https://api.openweathermap.org/data/2.5/weather'),
};

export const getConfig = () => baseUrls;
