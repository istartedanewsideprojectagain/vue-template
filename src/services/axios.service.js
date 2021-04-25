import Axios from 'axios';
import AuthService from '@/services/auth.service';
import store from '@/store';

const AxiosService = {
  init() {
    this.axios = Axios.create({
      headers: { 'Content-Type': 'application/json' },
      baseURL: process.env.VUE_APP_API_URL,
    });

    this.axios.interceptors.response.use(
      (config) => config,
      async (error) => {
        // Logs out whenever there is an unauthorized response from the ues.
        // TODO: good as there is only one role permitted on the dashboard (admin) for now!
        if (error.response && error.response.status === 401) {
          await store.dispatch('auth/logout');
        }

        return Promise.reject(error);
      },
    );

    

  },

  /**
   * Sends a GET request with a json body to the API.
   * @param {String} path A relative path to the resource.
   * @param {*} withAuth True if the auth header should be set.
   * @param {*} query Object used to create a query string (if not null, path is considered not to contain a query string).
   */
  async get(path, withAuth = true, query = null) {
    let queryString = '';
    if (query && query instanceof Object) {
      Object.entries(query).forEach(([key, value], index) => {
        queryString += index > 0 ? '&' : '?';
        queryString += `${key}=${value}`;
      });
    }

    return this.axios.get(path + queryString, {
      headers: withAuth ? this.authorizationHeader() : {},
    });
  },

  /**
   * Sends a POST request with a json body to the API.
   * @param {String} path A relative path to the ressource.
   * @param {*} body The request's body.
   * @param {*} withAuth True if the auth header should be set.
   * @param {*} query Object used to create a query string (if not null, path is considered not to contain a query string).
   */
  async post(path, body = {}, withAuth = true, query = null) {
    let queryString = '';
    if (query && query instanceof Object) {
      Object.entries(query).forEach(([key, value], index) => {
        queryString += index > 0 ? '&' : '?';
        queryString += `${key}=${value}`;
      });
    }
    return this.axios.post(path + queryString, body, {
      headers: withAuth ? this.authorizationHeader() : {},
    });
  },

  /**
   * Sends a PT request with a json body to the API.
   * @param {String} path A relative path to the ressource.
   * @param {*} body The request's body.
   * @param {*} withAuth True if the auth header should be set.
   */
  async put(path, body = {}, withAuth = true) {
    return this.axios.put(path, body, {
      headers: withAuth ? this.authorizationHeader() : {},
    });
  },

  /**
   * Sends a DELETE request with a json body to the API.
   * @param {String} path A relative path to the ressource.
   * @param {*} withAuth True if the auth header should be set.
   */
  async delete(path, withAuth = true) {
    return this.axios.delete(path, {
      headers: withAuth ? this.authorizationHeader() : {},
    });
  },

  /**
   * Creates an authorization header if ther is a token.
   * Returns an empty object otherwise.
   */
  authorizationHeader() {
    const user = AuthService.getUser();
    if (user && user.token) {
      return { Authorization: `Bearer ${user.token}` };
    }

    return {};
  },
};

export default AxiosService;

