import { getWeatherByCity, getWeatherByGeoLocation } from './openWeather';
// WIP: improve
// import { getConfig } from '../../config';
import { get } from './requests';

jest.mock('./requests');

describe('OpenWeather API', () => {
  const dummyResponse = { name: 'name', weather: {} };
  // const expectedUrl = `${getConfig().OPEN_WEATHER_URL}`;
  get.mockImplementation(() => dummyResponse);

  test('getWeatherByCity', async () => {
    const res = await getWeatherByCity();

    // expect(get).toHaveBeenCalledWith(expectedUrl);
    expect(res).toBe(dummyResponse);
  });

  test('getWeatherByGeoLocation', async () => {
    const res = await getWeatherByGeoLocation();

    // expect(get).toHaveBeenCalledWith(expectedUrl);
    expect(res).toBe(dummyResponse);
  });
});
