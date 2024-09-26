/**
 * Axios Shareable Instance module
 * @module shared/services/http-common
 * @description
 * http axios instance creation with default configs.
 * @requires axios
 * @requires env
 * @exports http
 */

import axios from "axios";

const API_BASE_URL = "http://localhost:3000";
/**
 * Axios instance
 * @summary http axios instance creation with default configs
 * @type {AxiosInstance}
 *
 */

const http = axios.create({
    baseURL: API_BASE_URL,
});

// Set default headers
http.defaults.headers.common['Content-type']                = 'application/json';
http.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

export default http;