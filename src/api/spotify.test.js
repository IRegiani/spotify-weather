// eslint-disable-next-line no-unused-vars
import { loadUserProfile, loadPlaylistsBySearch, loadTracksFromPlaylist, createPlaylist } from './spotify';

import { getConfig } from '../../config';
import { get } from './requests';

jest.mock('./requests');

describe('Spotify API', () => {
  const dummyResponse = { name: 'name', weather: {}, main: {} };
  const mockAuth = 'dummy-auth';

  test('loadUserProfile - calls route correctly with proper params', async () => {
    get.mockImplementation(() => dummyResponse);
    const expectedUrl = getConfig().SPOTIFY_URL;
    expectedUrl.addPath('me');

    const res = await loadUserProfile(mockAuth);

    expect(res).toEqual();
    // expect(get).toHaveBeenCalledWith(expectedUrl, `Bearer ${mockAuth}`); WIP: Serialises to the same string, make sure that mock is cleared
    expect(JSON.stringify(get.mock.calls[0])).toStrictEqual(JSON.stringify([expectedUrl, `Bearer ${mockAuth}`]));
  });

  test('loadPlaylistsBySearch - single call', async () => {
    const items = [{}];
    get.mockImplementation(() => ({ data: { playlists: { items, total: 1 } } }));
    const searchValue = 'dummy-search';

    const expectedUrl = getConfig().SPOTIFY_URL;
    expectedUrl.addPath('search');
    expectedUrl.searchParams.append('q', encodeURIComponent(searchValue));
    expectedUrl.searchParams.append('type', 'playlist');

    const res = await loadPlaylistsBySearch(mockAuth, searchValue);

    expect(res).toEqual(items);
    expect(JSON.stringify(get.mock.calls[0])).toStrictEqual(JSON.stringify([expectedUrl, `Bearer ${mockAuth}`]));
  });

  test.skip('loadPlaylistsBySearch - multiple calls', async () => {
    const items = [{}];
    get.mockImplementation(() => ({ data: { playlists: { items, total: 1 } } }));
    const searchValue = 'dummy search values';

    const expectedUrl = getConfig().SPOTIFY_URL;
    expectedUrl.addPath('search');
    expectedUrl.searchParams.append('q', encodeURIComponent(searchValue));
    expectedUrl.searchParams.append('type', 'playlist');

    const res = await loadPlaylistsBySearch(mockAuth, searchValue);

    expect(res).toEqual(items);
    // expect(get).toHaveBeenCalledWith(expectedUrl, `Bearer ${mockAuth}`); WIP: Serialises to the same string
    expect(JSON.stringify(get.mock.calls[0])).toStrictEqual(JSON.stringify([expectedUrl, `Bearer ${mockAuth}`]));
  });

  test.todo('loadTracksFromPlaylist');
  test.todo('createPlaylist');
});
