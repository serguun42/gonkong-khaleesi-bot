import fetch from 'node-fetch';
import { LoadTokensConfig, LoadUrlsConfig } from './load-configs.js';

const { X_USER, CSRF } = LoadTokensConfig();
const { BASE_URL, API_VERSION } = LoadUrlsConfig();
const USER_AGENT = `${process.env.npm_package_name}/${process.env.npm_package_version}`;

/** @type {import('../types/api').MakeRequest} */
const MakeRequest = (endpoint, method = 'GET', payload = null) => {
  if (!endpoint) return Promise.reject(new Error(`No endpoint`));

  return fetch(`https://${BASE_URL}/api/v${API_VERSION}/${endpoint}`, {
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
  }).then((res) => {
    if (!res.ok) return Promise.reject(new Error(`Response code: ${res.status} ${res.statusText} [${res.url}]`));

    return res.json().then((json) => Promise.resolve(json?.data || json));
  });
};

export default MakeRequest;
