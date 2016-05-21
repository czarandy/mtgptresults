'use strict';

var _ = require('underscore');
var deepcopy = require('deepcopy');
var Helper = require('./lib/helper.js');

module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    ava: {
      target: ['test/*.js']
    },

    githooks: {
      all: {
        'pre-commit': 'jshint jsonlint'
      },
    },

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
      all: [
        'Gruntfile.js',
        'lib/**/*.js',
        'test/**/*.js',
        'src/**/*.js',
        'src/**/*.jsx'
      ],
      options: {
        browser: true,
        jquery: true,
        node: true,
        strict: true
      }
    },

    jsonlint: {
      all: {
        src: [
          'data/**/*.json',
        ]
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
  grunt.loadNpmTasks('grunt-jsonlint');
  grunt.loadNpmTasks('grunt-githooks');
  grunt.loadNpmTasks('grunt-ava');

  grunt.registerTask('js', ['jshint', 'browserify']);
  grunt.registerTask('css', ['sass']);
  grunt.registerTask('json', ['jsonlint']);
  grunt.registerTask('build-data', ['tournaments', 'players', 'recent']);
  grunt.registerTask('default', ['build-data', 'copy', 'css', 'js', 'json',]);
  grunt.registerTask('prod', ['default', 'uglify', 'gh-pages']);

  var _tournaments = null;
  function loadTournaments() {
    if (_tournaments) {
      return _tournaments;
    }
    _tournaments = {};
    grunt.file.recurse('./data/', function(abspath, rootdir, subdir, filename) {
      if (filename.endsWith('.json')) {
        var tid = filename.replace('.json', '');
        _tournaments[tid] = grunt.file.readJSON(abspath);
      }
    });
    return _tournaments;
  }

  function jsonToStr(json) {
    return JSON.stringify(json, null, 4);
  }

  grunt.registerTask('tournaments', function() {
    grunt.file.write(
      './build/data/tournaments.js',
      'window.Tournaments = ' + jsonToStr(loadTournaments())
    );
  });

  grunt.registerTask('recent', function() {
    var tournaments = loadTournaments();
    var list = [];
    _.each(tournaments, function(tournament) {
      var topN = tournament.team ? 12 : 8;
      var recent = deepcopy(tournament);
      recent.top = recent.standings.slice(0, topN);
      delete recent.standings;
      list.push(recent);
    });
    grunt.file.write(
      './build/data/recent.js',
      'window.Recent = ' +
      jsonToStr(
        _.sortBy(list, function(item) { return -Helper.getDate(item.date); })
      )
    );

  });

  grunt.registerTask('players', function () {
    var tournaments = loadTournaments();
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
          finish: Helper.getPlayerIndex(
            index,
            tournament.team,
            tournament.team2hg) + 1,
          propoints: standing.propoints,
          tid: tournament.id,
          money: standing.money
        });
      });
    });

    players = _.mapObject(players, function(player) {
      return {
        id: player.id,
        name: player.name,
        tournaments: _.sortBy(player.tournaments, function(tournament) {
          return -Helper.getDate(tournaments[tournament.tid].date);
        })
      };
    });

    grunt.file.write('./build/data/players.js', 'window.Players = ' + jsonToStr(players));
  });
};
