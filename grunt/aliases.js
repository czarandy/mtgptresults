'use strict';

var _ = require('underscore');
var deepcopy = require('deepcopy');
var Helper = require('./../lib/helper.js');

module.exports = function(grunt) {
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

  var buildTournaments = function() {
    grunt.file.write(
      './build/data/tournaments.js',
      'window.Tournaments = ' + jsonToStr(loadTournaments())
    );
  };

  var buildRecent = function() {
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
  };

  var buildPlayers = function() {
    var tournaments = loadTournaments();
    var players = {};
    _.each(tournaments, function(tournament) {
      var standings = tournament.standings;
      _.each(standings, function(standing, index) {
        if (!(standing.id in players)) {
          players[standing.id] = {
            id: standing.id,
            name: standing.name,
            tournaments: [],
            stats: {
              money: 0,
              points: 0,
              total: 0,
              t1: 0,
              t8: 0,
              t16: 0
            }
          };
        }
        var finish = Helper.getPlayerIndex(
          index,
          tournament.team,
          tournament.team2hg
        ) + 1;
        players[standing.id].tournaments.push({
          finish: finish,
          propoints: standing.propoints,
          tid: tournament.id,
          money: standing.money
        });
        ++players[standing.id].stats.total;
        players[standing.id].stats.money += (standing.money || 0);
        players[standing.id].stats.points += (standing.propoints || 0);
        if (finish === 1) {
          ++players[standing.id].stats.t1;
        }
        if ((tournament.team && finish <= 4) || (!tournament.team && finish <= 8)) {
          ++players[standing.id].stats.t8;
        }
        if ((tournament.team && finish <= 8) || (!tournament.team && finish <= 16)) {
          ++players[standing.id].stats.t16;
        }
      });
    });
    players = _.mapObject(players, function(player) {
      if (player.stats.t8 > 0 && player.stats.total >= 10) {
        player.stats.t8pct = Math.floor(100 * player.stats.t8 / player.stats.total);
     } else {
        player.stats.t8pct = 0;
     }
      return {
        id: player.id,
        name: player.name,
        tournaments: _.sortBy(player.tournaments, function(tournament) {
          return -Helper.getDate(tournaments[tournament.tid].date);
        }),
        stats: player.stats
      };
    });
    grunt.file.write('./build/data/players.js', 'window.Players = ' + jsonToStr(players));
  };

  return {
    'js': ['eslint', 'ava', 'browserify'],
    'css': ['sass'],
    'json': ['jsonlint'],
    'tournaments': buildTournaments,
    'players': buildPlayers,
    'recent': buildRecent,
    'build-data': ['tournaments', 'players', 'recent'],
    'default': ['build-data', 'copy', 'css', 'js', 'json'],
    'prod': ['default', 'uglify', 'gh-pages']
  };
};
