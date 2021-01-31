import { post, get } from './requests';

jest.mock('axios');

describe('Request Utils', () => {
  test('post', async () => {
    await post();
  });

  test('post', async () => {
    await get();
  });
});
