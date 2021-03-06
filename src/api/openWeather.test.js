import { getWeatherByCity, getWeatherByGeoLocation } from './openWeather';
// WIP: improve
// import { getConfig } from '../../config';
import { get } from './requests';

jest.mock('./requests');

describe('OpenWeather API', () => {
  const dummyResponse = { data: { name: 'name', weather: {}, main: {} } };
  const expectedResponse = { ...dummyResponse.data.weather[0], ...dummyResponse.data.main, name: dummyResponse.data.name };

  test('getWeatherByCity', async () => {
    get.mockImplementation(() => dummyResponse);
    const res = await getWeatherByCity();

    // expect(get).toHaveBeenCalledWith(expectedUrl);
    expect(res).toEqual(expectedResponse);
  });

  test('getWeatherByGeoLocation', async () => {
    get.mockImplementation(() => dummyResponse);
    const res = await getWeatherByGeoLocation({ coords: {} });

    // expect(get).toHaveBeenCalledWith(expectedUrl);
    expect(res).toEqual(expectedResponse);
  });
});
