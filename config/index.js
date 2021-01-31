const baseUrls = {
  SPOTIFY_URL: new URL('https://api.spotify.com/v1/'),
  OPEN_WEATHER_URL: new URL('https://api.openweathermap.org/data/2.5/weather'),
};

export const getConfig = () => baseUrls;
