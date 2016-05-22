'use strict';

module.exports = {
  all: [
    'grunt/**/*.js',
    'Gruntfile.js',
    'lib/**/*.js',
    'src/**/*.js',
    'src/**/*.jsx',
    'test/**/*.js'
  ],
  options: {
    browser: true,
    jquery: true,
    node: true,
    strict: true
  }
};
