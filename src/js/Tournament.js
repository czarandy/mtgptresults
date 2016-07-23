'use strict';

export default class Tournament {
  constructor(data) {
    this.team = data.team;
    this.team2hg = data.team2hg;
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
    if (this.team && finish <= 4) {
      return 'warning';
    }
    if (!this.team && finish <= 8) {
      return 'warning';
    }
    return null;
  }

  getPlayerIndex(index) {
    if (this.team2hg) {
      return Math.floor(index / 2);
    }
    if (this.team) {
      return Math.floor(index / 3);
    }
    return index;
  }

  getPlayerClassName(index) {
    return this.getResultClassName(this.getPlayerIndex(index) + 1);
  }
}
