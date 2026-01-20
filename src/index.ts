import { createServer } from 'node:http';

import { config } from './config.js';

const server = createServer((_req, res) => {
  res.writeHead(200, { 'content-type': 'application/json; charset=utf-8' });
  res.end(
    JSON.stringify({
      status: 'ok',
      service: config.APP_NAME,
      env: config.NODE_ENV,
    }),
  );
});

server.listen(config.PORT, config.HOST);

const shutdown = (signal: NodeJS.Signals): void => {
  console.warn(`[shutdown] received ${signal}, closing server...`);

  server.close((error) => {
    if (error) {
      console.error('[shutdown] close failed:', error);
      process.exitCode = 1;
    }
    process.exit();
  });

  setTimeout(() => {
    console.error('[shutdown] force exit after timeout');
    process.exit(1);
  }, 10_000).unref();
};

process.on('SIGINT', () => shutdown('SIGINT'));
process.on('SIGTERM', () => shutdown('SIGTERM'));

process.on('uncaughtException', (error) => {
  console.error('[fatal] uncaughtException:', error);
  process.exit(1);
});

process.on('unhandledRejection', (reason) => {
  console.error('[fatal] unhandledRejection:', reason);
  process.exit(1);
});
