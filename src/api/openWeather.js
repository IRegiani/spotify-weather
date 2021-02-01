import { getConfig } from '../../config';
import { get } from './requests';

const openWeatherKey = process.env.OPEN_WEATHER_KEY;

const getWeatherByCity = async (city) => {
  const url = getConfig().OPEN_WEATHER_URL;
  url.searchParams.append('q', city);
  url.searchParams.append('appid', openWeatherKey);
  url.searchParams.append('lang', 'pt_br'); // TODO: get this from the store when personalization is coded
  url.searchParams.append('units', 'metric'); // TODO: get this from the store when personalization is coded, allowing imperial units

  const data = await get(url);
  return { ...data.weather[0], ...data.main };
};

const getWeatherByGeoLocation = async ({ coords: { latitude, longitude } }) => {
  const url = getConfig().OPEN_WEATHER_URL;
  url.searchParams.append('lat', latitude);
  url.searchParams.append('lon', longitude);
  url.searchParams.append('appid', openWeatherKey);
  url.searchParams.append('units', 'metric');

  const data = await get(url);
  return { ...data.weather[0], ...data.main, name: data.name };
};

export {
  getWeatherByCity,
  getWeatherByGeoLocation,
};
