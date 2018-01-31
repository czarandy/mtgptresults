'use strict';

import Helper from './../../lib/helper.js';

export default class Tournament {
  constructor(data) {
    this.teamsize = data.teamsize;
    this.date = data.date;
    this.name = data.name;
    this.id = data.id;
    this.coverage = data.coverage;
    this.formats = data.formats;
    this.location = data.location;
    this.standings = data.standings;
  }

  getResultClassName(finish) {
    if (finish === 1) {
      return 'success';
    }
    if (this.teamsize > 1 && finish <= 4) {
      return 'warning';
    }
    if (this.teamsize == 1 && finish <= 8) {
      return 'warning';
    }
    return null;
  }

  getPlayerIndex(index) {
    return Helper.getPlayerIndex(index, this.teamsize);
  }

  getPlayerClassName(index) {
    return this.getResultClassName(this.getPlayerIndex(index) + 1);
  }
}
