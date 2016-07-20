'use strict';

const Player = require('./Player.js');

module.exports = {
  byID: id => {
    return new Player(window.Players[id]);
  }
};
