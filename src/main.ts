import http from 'node:http';
import CoreAction from './core-action.js';
import { LoadUrlsConfig } from './util/load-configs.js';

const { WEBHOOK_SERVER_PORT, WEBHOOK_SERVER_PASS } = LoadUrlsConfig();

http
  .createServer((req, res) => {
    if (req.url !== `/local-webhook-server-endpoint?pass=${WEBHOOK_SERVER_PASS}`) {
      res.statusCode = 403;
      res.end('403 Forbidden');
      return;
    }

    CoreAction();
    res.statusCode = 200;
    res.end('200 OK');
  })
  .listen(WEBHOOK_SERVER_PORT);
