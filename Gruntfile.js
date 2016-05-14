var _ = require('underscore');

module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    clean: ['build/*'],

    copy: {
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
            src: 'src/CNAME',
            dest: 'build/CNAME'
          }
        ]
      },
      logos: {
        files: [
          {
            expand: true,
            cwd: 'data/',
            src: 'logo/*.png',
            dest: 'build/',
          }
        ],
      },
      data: {
        files: [
          {
            src: 'data/recent.json',
            dest: 'build/data/recent.js',
          },
          {
            src: 'data/tournaments.json',
            dest: 'build/data/tournaments.js',
          }
        ],
        options: {
          process: function(data, path) {
            path = path.replace('data/', '');
            path = path.replace('.json', '');
            arg = path.charAt(0).toUpperCase() + path.slice(1);
            return 'window.' + arg + ' = ' + data + ';';
          },
        }
      }
    },

    sass: {
      all: {
        options: {
          outputStyle: 'compressed'
        },
        files: {
          'build/css/app.css': 'src/css/app.scss'
        }
      }
    },

    jshint: {
      all: ['src/**/*.js', 'src/**/*.jsx'],
      options: {
        browser: true,
        jquery: true,
        node: true,
        strict: true
      }
    },

    browserify: {
      all: {
        files: {
          'build/js/app.js' : ['src/js/*.js', 'src/js/*.jsx']
        }
      },
      options: {
        transform: [ require('grunt-react').browserify ],
        extensions: ['js', 'jsx']
      }
    },

    uglify: {
      all: {
        files: {
          'build/js/app.js' : ['build/js/app.js'],
          'build/data/players.js' : ['build/data/players.js'],
          'build/data/recent.js' : ['build/data/recent.js'],
          'build/data/tournaments.js' : ['build/data/tournaments.js']
        }
      }
    },

    'gh-pages': {
      options: {
        base: 'build'
      },
      src: '**/*'
    }
  });

  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-jsxhint');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-gh-pages');

  grunt.registerTask('js', ['jshint', 'browserify']);
  grunt.registerTask('css', ['sass']);
  grunt.registerTask('default', ['copy', 'css', 'js'])
  grunt.registerTask('prod', ['players', 'default', 'uglify', 'gh-pages'])
  grunt.registerTask('players', function (key, value) {
    var path = './data/tournaments.json';

    if (!grunt.file.exists(path)) {
      grunt.log.error("file " + path + " not found");
      return false;
    }

    var data = grunt.file.readJSON(path);
    var tournaments = data;
    var players = {};

    _.each(tournaments, function(tournament) {
      var standings = tournament.standings;

      _.each(standings, function(standing, index) {

        if (!(standing.id in players)) {
          players[standing.id] = {
            id: standing.id,
            name: standing.name,
            tournaments: []
          };
        }

        players[standing.id].tournaments.push({
          finish: index + 1,
          propoints: standing.propoints,
          tid: tournament.id,
          money: standing.money
        });
      })
    });

    players = _.mapObject(players, function(player) {
      return {
        id: player.id,
        name: player.name,
        tournaments: _.sortBy(player.tournaments, function(tournament) {
          var date = tournaments[tournament.tid].date;
          var year = date.substr(-4);
          var month = date.match(/\w+/)[0].substr(0, 3);
          var day = date.match(/\d+/)[0];
          var test = Date.parse(month + ' ' + day + ', ' + year);

          return - test;
        })
      };
    });

    players = JSON.stringify(players, null, 4);
    players = players.replace(/[\u007F-\uFFFF]/g, function(chr) {
      return "\\u" + ("0000" + chr.charCodeAt(0).toString(16)).substr(-4)
    })

    grunt.file.write('./build/data/players.js', 'window.Players = ' + players);
  });
}
