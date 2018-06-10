'use strict';

module.exports = {
  server: {
    options: {
      base: 'build',
      port: 8000,
      open: true,
      keepalive: true,
      middleware: function(connect, options, middleware) {
        middleware.unshift(function(req, res, next) {
          if (
            req.url.endsWith('js') ||
            req.url.endsWith('css') ||
            req.url.endsWith('svg') ||
            req.url.endsWith('png')
          ) {
            return next();
          }
          require('fs')
            .createReadStream('build/index.html')
            .pipe(res);
        });
        return middleware;
      }
    }
  }
};
