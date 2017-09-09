import _ from 'lodash';
import accounting from 'accounting';
import players from './Players.js';

export default class Ranking {

  constructor (col = 't8') {
    const sortedPlayers = _.chain(players.asArray())
      .values()
      .sortBy((player) => player.stats[col])
      .reverse()
      .value();

    const cutoff = sortedPlayers[99].stats[col];
    this.players = _.filter(sortedPlayers, (p) => p.stats[col] >= cutoff);
    this.headers = [
      'Rank',
      // 'Country',
      'Name',
      'Total Pro Tours',
      'Wins',
      'Top 8s',
      'Top 16s',
      'Pro Points',
      'Money',
      'Top 8 Conversion'
    ]
  }

  getHeader(index) {
    return this.headers[index];
  }

  getPlayers() {
    return this.players;
  }

  getCell(columnIndex, rowIndex) {
    const player = this.players[rowIndex];
    const row = [
      rowIndex,
      // player.nationality,
      player.id,
      player.stats.total,
      player.stats.t1,
      player.stats.t8,
      player.stats.t16,
      player.stats.points,
      accounting.formatMoney(player.stats.money, '$', 0),
      player.stats.t8pct + '%'
    ]

    return row[columnIndex];
  }
}
