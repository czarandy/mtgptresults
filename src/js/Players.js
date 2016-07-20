'use strict';

// Injected global data
const Players = window.Players;

import Player from './Player.js';

const PlayersArray = [];
for (let key in Players) {
  PlayersArray.push(Players[key]);
}

const asArray = () => PlayersArray;

const byID = id => new Player(Players[id]);

export default {asArray, byID};
