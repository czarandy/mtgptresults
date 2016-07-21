'use strict';

import {formatMoney} from './utils.js';

export default class Player {
  constructor(data) {
    this.flag = data.flag;
    this.id = data.id;
    this.name = data.name;
    this.nationality = data.nationality;
    this.hof = data.hof;
    this.stats = data.stats;
    this.tournaments = data.tournaments;
  }

  getMoney() {
    return formatMoney(this.stats.money);
  }
}
