'use strict';

import React from 'react';
import {render} from 'react-dom';
import {
  Router,
  Route,
  IndexRoute,
  Link,
  browserHistory,
  applyRouterMiddleware,
} from 'react-router';
import DocumentTitle from 'react-document-title';
import { useScroll } from 'react-router-scroll';


import NotFound from './NotFound.react.js';
import Page from './Page.react.js';
import Players from './Players.js';
import PlayerLink from './PlayerLink.react.js';
import Player from './Player.react.js';
import Tournament from './Tournament.react.js';

var _ = require('underscore');
var accounting = require('accounting');
var Helper = require('./../../lib/helper.js');

var Rankings = React.createClass({
  render: function() {
    var col = this.props.params.col;
    var sortedPlayers =
      _.chain(window.Players)
        .values()
        .sortBy(function(player) { return player.stats[col]; })
        .reverse()
        .value();

    // Include anyone tied with the 100th rank
    var cutoff = sortedPlayers[99].stats[col];
    var players = _.filter(sortedPlayers, function(p) { return p.stats[col] >= cutoff; });

    var prev = {value: null};
    var sortImage = <img src="/arrowicon.png" />;
    return (
      <div className="col-md-offset-2 col-md-8">
        <DocumentTitle title="Player Rankings" />
        <div className="page-header pageHeader">
          <h1>Player Rankings</h1>
        </div>
        <table className="table table-hover sortable standingsTable">
          <thead>
            <tr>
              <th></th>
              <th>Player</th>
              <th className="sortableHeader">
                <Link to="/rankings/total">
                  Total PTs
                </Link>
                {col === 'total' ? sortImage : null}
              </th>
              <th className="sortableHeader">
                <Link to="/rankings/t1">
                  Wins
                </Link>
                {col === 't1' ? sortImage : null}
              </th>
              <th className="sortableHeader">
                <Link to="/rankings/t8">
                  Top 8s
                </Link>
                {col === 't8' ? sortImage : null}
              </th>
              <th className="sortableHeader">
                <Link to="/rankings/t16">
                  Top 16s
                </Link>
                {col === 't16' ? sortImage : null}
              </th>
              <th className="sortableHeader">
                <Link to="/rankings/points">
                  Pro Points
                </Link>
                {col === 'points' ? sortImage : null}
              </th>
              <th className="sortableHeader">
                <Link to="/rankings/money">
                  Money
                </Link>
                {col === 'money' ? sortImage : null}
              </th>
              <th className="sortableHeader">
                <Link to="/rankings/t8pct">
                  T8/Total
                </Link>
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
                  <td>
                    {accounting.formatMoney(player.stats.money, '$', 0)}
                  </td>
                  <td>{player.stats.t8pct}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
});

var RecentTournaments = React.createClass({
  render: function() {
    var that = this;
    return (
      <div className="col-md-offset-3 col-md-6">
        <div className="alert alert-info" role="alert">
          {'This site is now open source on '}
          <a className="alert-link" href="https://github.com/czarandy/mtgptresults">GitHub</a>.
        </div>
        <DocumentTitle title="MTG Pro Tour Results" />
        {_.map(window.Recent, function(tournament) {
          var id = tournament.id;
          return (
            <div key={id}>
              <div className="panel panel-default recentTournamentWrapper">
                <div className="panel-heading">
                  <Link to={'/tournament/' + id}>
                    {tournament.name}
                  </Link>
                </div>
                <div className="panel-body recentTournament">
                  <div className="row">
                    <div className="col-sm-5">
                      <div className="image">
                        {that._renderLogo(id, tournament)}
                        <p>
                          {tournament.formats.join(' / ')}
                          <br />
                          {tournament.date}
                          <br />
                          {tournament.location}
                        </p>
                      </div>
                    </div>
                    <div className="col-sm-7">
                      <ul className="List">
                        {
                          _.map(tournament.top, function(player, idx) {
                            idx = Helper.getPlayerIndex(
                              idx,
                              tournament.teamsize
                            );
                            return (
                              <li className={idx === 0 ? 'List-item List-item--big' : 'List-item '} key={player.id}>
                                <span className="List-index">{idx + 1}{'. '}</span>
                                <PlayerLink player={Players.byID(player.id)} />
                              </li>
                            );
                          })
                        }
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  },
  _renderLogo: function(id, t) {
    if (!t.logo) {
      return null;
    }
    return (
      <Link to={'/tournament/' + id}>
        <img src={'/logo/' + t.logo} />
      </Link>
    );
  }
});

render((
  <Router history={browserHistory} render={applyRouterMiddleware(useScroll())}>
    <Route path="/" component={Page}>
      <IndexRoute component={RecentTournaments} />
      <Route path="/player/:id" component={Player} />
      <Route path="/tournament/:id" component={Tournament} />
      <Route path="/rankings/:col" component ={Rankings} />
      <Route path="*" component={NotFound} />
    </Route>
  </Router>
), document.getElementById('approot'));
