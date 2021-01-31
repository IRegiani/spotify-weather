import { login } from './spotify';

import { getConfig } from '../../config';
import { post } from './requests';

jest.mock('./requests');

describe('Spotify API', () => {
  test('login - calls route correctly with proper params', () => {
    const expectedUrl = `${getConfig().SERVICE_URL}/login`;
    const password = 'password';
    const email = 'email';

    login(email, password);
    expect(post).toHaveBeenCalledWith(expectedUrl, { email, password });
  });
});
