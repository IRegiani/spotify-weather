import axios from 'axios';

const createRequest = async (url, method, data, auth) => {
  const requestObject = {
    method,
    url,
    data,
    headers: {
      'Content-type': 'application/json',
    },
    timeout: 15000,
  };
  if (auth) requestObject.headers.Authorization = auth;
  try {
    const res = await axios.request(requestObject);
    return { status: res.status, data: res.data, headers: res.headers };
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('ERROR in http request:\n\n', JSON.stringify(err));
    err.status = err.response.status;
    throw err;
  }
};

const get = async (url, auth) => createRequest(url.toString(), 'GET', undefined, auth);
const post = async (url, data, auth) => createRequest(url.toString(), 'POST', data, auth);

export { post, get };
