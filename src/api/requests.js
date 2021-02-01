import axios from 'axios';

const createRequest = async (url, method, data, Authorization) => {
  const requestObject = {
    method,
    url,
    data,
    headers: {
      'Content-type': 'application/json',
      Authorization,
    },
    timeout: 15000,
  };
  try {
    const res = await axios.request(requestObject);
    return { status: res.status, data: res.data, headers: res.headers };
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('ERROR in http request: ', JSON.stringify(err));
    throw err;
  }
};

const get = (url, auth) => createRequest(url.toString(), 'GET', auth);
const post = (url, data, auth) => createRequest(url.toString(), 'POST', data, auth);

export { post, get };
