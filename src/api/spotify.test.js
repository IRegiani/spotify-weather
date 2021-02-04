import { loadUserProfile } from './spotify';

import { getConfig } from '../../config';
import { get } from './requests';

jest.mock('./requests');

describe('Spotify API', () => {
  const dummyResponse = { name: 'name', weather: {}, main: {} };

  test('loadUserProfile - calls route correctly with proper params', async () => {
    get.mockImplementation(() => dummyResponse);
    const expectedUrl = getConfig().SPOTIFY_URL;
    expectedUrl.addPath('me');
    const mockAuth = 'dummy-auth';

    const res = await loadUserProfile(mockAuth);

    expect(res).toEqual();
    expect(get).toHaveBeenCalledWith(expectedUrl, `Bearer ${mockAuth}`);
  });
});
