'use strict';

module.exports = {
  all: {
    files: [
      {
        src: 'src/index.html',
        dest: 'build/index.html'
      },
      {
        src: 'src/index.html',
        dest: 'build/404.html'
      },
      {
        src: 'src/ptlogo.png',
        dest: 'build/logo/ptlogo.png'
      },
      {
        src: 'src/arrowicon.png',
        dest: 'build/arrowicon.png'
      },
      {
        expand: true,
        cwd: 'src/',
        src: 'css/*.css',
        dest: 'build/'
      },
      {
        src: 'src/CNAME',
        dest: 'build/CNAME'
      }
    ]
  },
  flags: {
    files: [
      {
        expand: true,
        cwd: 'src/',
        src: 'flags/**/*.svg',
        dest: 'build/'
      }
    ]
  },
  logos: {
    files: [
      {
        expand: true,
        cwd: 'data/',
        src: 'logo/*.png',
        dest: 'build/'
      }
    ]
  }
};
