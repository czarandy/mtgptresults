'use strict';

module.exports = {
  all: {
    files: {
      'build/js/app.js' : ['src/js/*.js', 'src/js/*.jsx']
    }
  },
  options: {
    transform: [ require('grunt-react').browserify ],
    extensions: ['js', 'jsx']
  }
};
