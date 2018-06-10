'use strict';

import DocumentTitle from 'react-document-title';
import React from 'react';
import {Link} from 'react-router';
import Players from './Players.js';
import PlayerLink from './PlayerLink.react.js';

const _ = require('underscore');
const accounting = require('accounting');

const Rankings = props => {
  const col = props.params.col;
  const sortedPlayers = _.chain(window.Players)
    .values()
    .sortBy(player => player.stats[col])
    .reverse()
    .value();

  // Include anyone tied with the 100th rank
  const cutoff = sortedPlayers[99].stats[col];
  const players = _.filter(sortedPlayers, function(p) {
    return p.stats[col] >= cutoff;
  });

  const prev = {value: null};
  const sortImage = <img src="/arrowicon.png" />;
  return (
    <div className="col-md-offset-2 col-md-8">
      <DocumentTitle title="Player Rankings" />
      <div className="page-header pageHeader">
        <h1>Player Rankings</h1>
      </div>
      <table className="table table-hover sortable standingsTable">
        <thead>
          <tr>
            <th />
            <th>Player</th>
            <th className="sortableHeader">
              <Link to="/rankings/total">Total PTs</Link>
              {col === 'total' ? sortImage : null}
            </th>
            <th className="sortableHeader">
              <Link to="/rankings/t1">Wins</Link>
              {col === 't1' ? sortImage : null}
            </th>
            <th className="sortableHeader">
              <Link to="/rankings/t8">Top 8s</Link>
              {col === 't8' ? sortImage : null}
            </th>
            <th className="sortableHeader">
              <Link to="/rankings/t16">Top 16s</Link>
              {col === 't16' ? sortImage : null}
            </th>
            <th className="sortableHeader">
              <Link to="/rankings/points">Pro Points</Link>
              {col === 'points' ? sortImage : null}
            </th>
            <th className="sortableHeader">
              <Link to="/rankings/money">Money</Link>
              {col === 'money' ? sortImage : null}
            </th>
            <th className="sortableHeader">
              <Link to="/rankings/t8pct">T8/Total</Link>
              {col === 't8pct' ? sortImage : null}
            </th>
          </tr>
        </thead>
        <tbody>
          {_.map(players, function(player, index) {
            if (prev.value !== player.stats[col]) {
              prev.value = player.stats[col];
              prev.index = index;
              ++index;
            } else {
              index = null;
            }
            return (
              <tr key={player.id}>
                <td>{index}</td>
                <td>
                  <PlayerLink player={Players.byID(player.id)} />
                </td>
                <td>{player.stats.total}</td>
                <td>{player.stats.t1}</td>
                <td>{player.stats.t8}</td>
                <td>{player.stats.t16}</td>
                <td>{player.stats.points}</td>
                <td>{accounting.formatMoney(player.stats.money, '$', 0)}</td>
                <td>{player.stats.t8pct}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Rankings;
