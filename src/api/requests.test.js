import { post, get } from './requests';

const mockResponse = { status: 'dummy-status', data: 'dummy-data', headers: 'dummy-headers' };

jest.mock('axios', () => ({ request: () => mockResponse }));

const dummyUrl = new URL('https://www.google.com');

describe('Request Utils', () => {
  test('post', async () => {
    await post(dummyUrl);
  });

  test('post', async () => {
    await get(dummyUrl);
  });
});
