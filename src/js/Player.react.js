'use strict';

import React from 'react';
import {Link} from 'react-router';
import DocumentTitle from 'react-document-title';

import NotFound from './NotFound.react.js';
import PlayerLink from './PlayerLink.react.js';
import Players from './Players.js';
import TournamentLink from './TournamentLink.react.js';
import Tournaments from './Tournaments.js';
import {formatMoney} from './utils.js';

const Player = props => {
  const id = props.params.id;
  const player = Players.byID(id);
  if (!player) {
    return <NotFound />;
  }
  return (
    <div className="col-md-offset-3 col-md-6">
      <DocumentTitle title={player.name} />
      <div className="page-header pageHeader">
        <h1>
          <PlayerLink player={player} />
        </h1>
      </div>
      <div className="Stat">
        <div className="Stat-alert alert alert-info">
          <div className="Stat-value">
            {player.stats.t1} / {player.stats.t8} / {player.stats.t16} /{' '}
            {player.stats.total}
          </div>
          <div>
            <Link className="Stat-link" to="/rankings/t1">
              Wins
            </Link>
            {' / '}
            <Link className="Stat-link" to="/rankings/t8">
              T8
            </Link>
            {' / '}
            <Link className="Stat-link" to="/rankings/t16">
              T16
            </Link>
            {' / '}
            <Link className="Stat-link" to="/rankings/total">
              Total
            </Link>
          </div>
        </div>
        <div className="Stat-alert alert alert-info">
          <div className="Stat-value">{player.getMoney()}</div>
          <div>
            <Link className="Stat-link" to="/rankings/money">
              Total Money
            </Link>
          </div>
        </div>
        <div className="Stat-alert alert alert-info">
          <div className="Stat-value">{player.stats.points}</div>
          <div>
            <Link className="Stat-link" to="rankings/points">
              Total Pro Points
            </Link>
          </div>
        </div>
      </div>
      <table className="table table-hover table-striped">
        <thead>
          <tr>
            <th>Date</th>
            <th>Tournament</th>
            <th>Finish</th>
            <th>Pro Points</th>
            <th>Prize Money</th>
          </tr>
        </thead>
        <tbody>
          {player.tournaments.map(t => {
            const tournament = Tournaments.byID(t.tid);
            if (!tournament) {
              return null;
            }
            return (
              <tr
                key={t.tid}
                className={tournament.getResultClassName(t.finish)}
              >
                <td>{tournament.date}</td>
                <td>
                  <TournamentLink tournament={tournament} />
                </td>
                <td>{t.finish}</td>
                <td>{t.propoints}</td>
                <td>{formatMoney(t.money)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Player;
