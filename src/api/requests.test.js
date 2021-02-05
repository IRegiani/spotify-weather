import axios from 'axios';
import { post, get } from './requests';

const dummyResponse = { status: 'dummy-status', data: 'dummy-data', headers: 'dummy-headers' };
// const mockedRequest = jest.fn().mockImplementation(() => dummyResponse);

jest.mock('axios', () => ({ request: jest.fn() }));

const dummyUrl = new URL('https://www.google.com');

describe('Request Utils', () => {
  test('post', async () => {
    axios.request.mockImplementation(() => dummyResponse);

    const res = await post(dummyUrl);
    expect(res).toEqual(dummyResponse);
  });

  test('get', async () => {
    axios.request.mockImplementation(() => dummyResponse);

    const res = await get(dummyUrl);
    expect(res).toEqual(dummyResponse);
  });

  test('get - with auth', async () => {
    const dummyAuth = 'auth';
    axios.request.mockImplementation(() => dummyResponse);

    const res = await get(dummyUrl, dummyAuth);

    expect(res).toEqual(dummyResponse);
    expect(axios.request).toHaveBeenCalledWith(
      { method: 'GET', url: dummyUrl.toString(), data: undefined, headers: { 'Content-type': 'application/json', Authorization: dummyAuth }, timeout: 15000 },
    );
  });

  test('get - error', async () => {
    const mockError = new Error('dummy-error');
    mockError.response = { status: 418 };
    axios.request.mockRejectedValue(mockError);
    let err;

    const res = await get(dummyUrl, 'auth').catch((error) => { err = error; });

    expect(res).toBe(undefined);
    expect(err).toEqual(mockError);
  });
});
