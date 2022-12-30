import axios from 'axios';

const SERVER_URL = 'https://olp5ytqxm2.execute-api.eu-central-1.amazonaws.com/default';

axios.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const { data: { message } } = error.response;
    // eslint-disable-next-line no-console
    console.error('[API ERROR]\n', message); // Should be send to bug tracking tool instead
    return {
      success: false,
      message: message || '🤭 Oops... tech issue. If the issue persists please contact support.',
    };
  },
);

const getIdToken = () => 'XXX'; // Get the token from the JWT response from Auth

class API {
  static headers () {
    return {
      Authorization: `Bearer ${getIdToken()}`,
      'Content-type': 'application/json',
    };
  }

  static async get (endPoint, params = {}) {
    const options = {
      baseURL: SERVER_URL,
      url: endPoint,
      method: 'GET',
      params,
      headers: this.headers(),
    };
    return axios(options);
  }

  static async post (endPoint, data = {}) {
    const options = {
      baseURL: SERVER_URL,
      url: endPoint,
      method: 'POST',
      data: JSON.stringify(data),
      headers: this.headers(),
      timeout: 30000,
    };
    return axios(options);
  }

  static async put (endPoint, data = {}) {
    const options = {
      baseURL: SERVER_URL,
      url: endPoint,
      method: 'PUT',
      data: JSON.stringify(data),
      headers: this.headers(),
    };
    return axios(options);
  }

  static async delete (endPoint, data = {}) {
    const options = {
      baseURL: SERVER_URL,
      url: endPoint,
      method: 'DELETE',
      data: JSON.stringify(data),
      headers: this.headers(),
    };
    return axios(options);
  }
}

export default API;