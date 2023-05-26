import APIError from '../api/api-error.js';
import LogMessageOrError from './log.js';

const DEFAULT_DELAY_MS = 500;

const Wait = (delay: number = DEFAULT_DELAY_MS): Promise<void> =>
  new Promise((resolve) => {
    setTimeout(resolve, delay);
  });

type Action<T> = () => Promise<T>;

export default function Delay<T>(action: Action<T>, delaySize = 1, recursionLevel = 0): Promise<T> {
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
}
