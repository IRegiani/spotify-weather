import { getConfig } from '../../config';
import { get } from './requests';

const openWeatherKey = process.env.OPEN_WEATHER_KEY;

const getWeatherByCity = async (city) => {
  const url = getConfig().OPEN_WEATHER_URL;
  url.search('q', city);
  url.search('appid', openWeatherKey);
  url.search('lang', 'pt_br'); // TODO: get this from the store when personalization is coded
  url.search('units', 'metric'); // TODO: get this from the store when personalization is coded, allowing imperial units

  const data = await get(url);
  return { ...data.weather[0], ...data.main };
};

const getWeatherByGeoLocation = async ({ coords: { latitude, longitude } }) => {
  const url = getConfig().OPEN_WEATHER_URL;
  url.search('lat', latitude);
  url.search('lon', longitude);
  url.search('appid', openWeatherKey);
  url.search('units', 'metric');

  const data = await get(url);
  return { ...data.weather[0], ...data.main, name: data.name };
};

export {
  getWeatherByCity,
  getWeatherByGeoLocation,
};
