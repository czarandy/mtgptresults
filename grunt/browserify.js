'use strict';

module.exports = {
  all: {
    files: {
      'build/js/app.js' : ['src/js/*.js', 'src/js/*.jsx']
    }
  },
  options: {
    transform: [ ['babelify', {presets: ["es2015", "react"]}] ],
    extensions: ['js', 'jsx']
  }
};
