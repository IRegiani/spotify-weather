import { getConfig } from '../../config';
import { get } from './requests';

const buildAuthString = (token) => `Bearer ${token}`;

const loadUserProfile = async (auth) => {
  const url = getConfig().SPOTIFY_URL;
  url.addPath('me');
  const { data } = await get(url, buildAuthString(auth));
  return data;
};

export {
  loadUserProfile,
};
