import APIError from '../api/api-error.js';
import LogMessageOrError from './log.js';

const DEFAULT_DELAY_MS = 500;

/**
 * @param {number} delay
 * @returns {Promise}
 */
const Wait = (delay = DEFAULT_DELAY_MS) =>
  new Promise((resolve) => {
    setTimeout(resolve, delay);
  });

/**
 * @template T
 * @typedef {() => Promise<T>} Action<T>
 */
/**
 * @template T
 * @param {Action<T>} action
 * @param {number} [delay]
 * @param {number} [recursionLevel]
 * @returns {Promise<T>}
 */
const Delay = (action, delaySize, recursionLevel = 0) => {
  if (recursionLevel > 3)
    return Promise.reject(new Error(`Too deep recursion when handling queue's error. Action: ${action}`));

  return Wait(delaySize * DEFAULT_DELAY_MS)
    .then(() => action())
    .catch((e) => {
      if (e instanceof APIError) {
        if (e.status === 403 || e.status === 404) return Promise.reject(e);
      }

      LogMessageOrError(new Error(`Error ${e} in queue`));
      return Delay(action, 10, recursionLevel + 1);
    });
};

export default Delay;
