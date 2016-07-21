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

  getDisplayName() {
    if (this.nationality) {
      return `${this.name} (${this.nationality})`;
    }
    return this.name;
  }

  getMoney() {
    return formatMoney(this.stats.money);
  }
}
