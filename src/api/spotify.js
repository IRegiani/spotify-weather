import { getConfig } from '../../config';
import { get } from './requests';

// TODO: Create a wrapper around those calls to redirect catch 401 || 400 and redirect, like on Home
// TODO: Handle country from userProfile

const buildAuthString = (token) => `Bearer ${token}`;
const getRandInt = (max) => Math.floor(Math.random() * max) + 1;

const getUniqueRandInts = (size, max) => {
  const set = new Set();
  while (set.size < size) set.add(getRandInt(max));
  return [...set];
};

const loadUserProfile = async (auth) => {
  const url = getConfig().SPOTIFY_URL;
  url.addPath('me');

  const { data } = await get(url, buildAuthString(auth));
  return data;
};

const loadPlaylistsBySearch = async (auth, search) => {
  const getSearch = (s) => {
    const url = getConfig().SPOTIFY_URL;
    url.addPath('search');
    url.searchParams.append('q', encodeURIComponent(s));
    url.searchParams.append('type', 'playlist');

    return get(url, buildAuthString(auth));
  };

  const { data: { playlists: { items, total } } } = await getSearch(search);

  if (total) return items;

  const searchItems = search.split(' ');
  const multipleSearches = await Promise.all(searchItems.map(getSearch));

  const allItems = multipleSearches.reduce((acc, curr) => { acc.push(...curr.data.playlists.items); return acc; }, []);
  const limit = allItems.length - 1 > 10 ? 10 : allItems.length - 1;
  const rands = getUniqueRandInts(limit, allItems.length - 1);
  return rands.reduce((acc, currIndex) => { acc.push(allItems[currIndex]); return acc; }, []);
};

const loadTracksFromPlaylist = async (auth, playlistId) => {
  const url = getConfig().SPOTIFY_URL;
  url.addPath(`playlists/${playlistId}`);

  const { data: { tracks } } = await get(url, buildAuthString(auth));
  return tracks;
};

// fav plalist
// add track
// remove track

export {
  loadUserProfile,
  loadPlaylistsBySearch,
  loadTracksFromPlaylist,
};
