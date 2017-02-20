'use strict';

module.exports = {
  scripts: {
    files: 'src/js/*.js',
    tasks: [
      'browserify'
    ]
  },
  styles: {
    files: [
      'src/css/*.scss',
      'src/css/*.css'
    ],
    tasks: ['sass']
  },
  data: {
    files: [
      'data/*.json'
    ],
    tasks: ['build-data']
  }
};
