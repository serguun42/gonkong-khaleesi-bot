import fetch from 'node-fetch';
import { LoadTokensConfig, LoadUrlsConfig } from '../util/load-configs.js';
import LogMessageOrError from '../util/log.js';
import APIError from './api-error.js';

const { X_USER, CSRF } = LoadTokensConfig();
const { BASE_URL, API_VERSION } = LoadUrlsConfig();
const USER_AGENT = `${process.env.npm_package_name}/${process.env.npm_package_version}`;

/** @type {import('../types/api').MakeRequest} */
const MakeRequest = (endpoint, method = 'GET', payload = null) => {
  if (!endpoint) return Promise.reject(new Error(`No endpoint`));

  const builtUrl = `https://${BASE_URL}/api/v${API_VERSION}/${endpoint}`;

  return fetch(builtUrl, {
    headers: {
      'User-Agent': USER_AGENT,
      'Accept-Language': 'en-US',
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${X_USER}`,
      'X-CSRF-TOKEN': CSRF,
      'X-XSRF-TOKEN': CSRF,
    },
    body: payload ? JSON.stringify(payload) : null,
    method,
  }).then((serverResponse) => {
    if (!serverResponse.ok)
      return serverResponse.text().then(
        (textResponse) => Promise.reject(new APIError(serverResponse, textResponse, payload)),
        (textResponseReadError) => {
          LogMessageOrError(textResponseReadError);
          return Promise.reject(new APIError(serverResponse, '<unknown>', payload));
        }
      );

    return serverResponse.json().then((json) => Promise.resolve(json?.data || json));
  });
};

export default MakeRequest;
