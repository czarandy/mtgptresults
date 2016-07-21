'use strict';

export default class Tournament {
  constructor(data) {
    this.team = data.team;
    this.date = data.date;
    this.name = data.name;
    this.id = data.id;
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
}
