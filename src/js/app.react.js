'use strict';

var DocumentTitle = require('react-document-title');
var React = require('react');
var Router = require('react-router');
var _ = require('underscore');
var accounting = require('accounting');
var Helper = require('./../../lib/helper.js');

var Link = Router.Link;
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;
var DefaultRoute = Router.DefaultRoute;
var NotFoundRoute = Router.NotFoundRoute;

var SearchInput = React.createClass({
  mixins: [Router.Navigation],
  render: function() {
    return (
      <input
        type="text"
        className="searchInput form-control"
        placeholder="Search"
        autoComplete="off"
        ref="input"
      />
    );
  },
  componentDidMount: function() {
    var ts = [];
    for (var k in window.Tournaments) {
      var t = window.Tournaments[k];
      ts.push({
        id: t.id,
        name: t.name + ' (' + t.date.substr(-4) + ')'
      });
    }
    $(this.getDOMNode()).typeahead({
      source: ts.concat(_.values(window.Players)),
      afterSelect: function(item) {
        if (item.tournaments) {
          this.transitionTo('player', {id: item.id});
        } else {
          this.transitionTo('tournament', {id: item.id});
        }
        this.refs.input.getDOMNode().value = '';
      }.bind(this)
    });
  }
});

var App = React.createClass({
  render: function() {
    return (
      <div>
        <div className="navbar navbar-default">
          <div className="container-fluid">
            <div className="navbar-header">
              <Link className="navbar-brand" to="default">
                MTG Pro Tour Results
              </Link>
            </div>
            <div className="navbar-form navbar-right">
              <SearchInput />
            </div>
          </div>
        </div>
        <RouteHandler />
      </div>
    );
  }
});

var NotFound = React.createClass({
  render: function() {
    return (
      <DocumentTitle title="MTG Pro Tour Results | Not Found">
      <div className="col-md-offset-3 col-md-6 container">
        <div className="jumbotron notFound">
          <h1>Not Found</h1>
          <p>Unfortunately, no content was found at this URL.</p>
        </div>
      </div>
      </DocumentTitle>
    );
  }
});

var Player = React.createClass({
  mixins: [Router.State],
  render: function() {
    var id = this.getParams().id;
    var p = window.Players[id];
    if (!p) {
      return (<NotFound />);
    }
    var total = 0;
    var t1 = 0;
    var t8 = 0;
    var t16 = 0;
    var totalMoney = 0;
    var totalPoints = 0;
    _.map(p.tournaments, function(t) {
      var tdata = window.Tournaments[t.tid];
      if (!tdata) { return; }
      if (t.money) {
        totalMoney += t.money;
      }
      if (t.propoints) {
        totalPoints += t.propoints;
      }
      ++total;
      if (t.finish === 1) {
        ++t1;
      }
      if ((tdata.team && t.finish <= 4) || (!tdata.team && t.finish <= 8)) {
        ++t8;
      }
      if ((tdata.team && t.finish <= 8) || (!tdata.team && t.finish <= 16)) {
        ++t16;
      }
    });
    return (
      <div className="col-md-offset-3 col-md-6">
        <DocumentTitle title={p.name} />
        <div className="page-header pageHeader">
          <h1>{p.name}</h1>
        </div>
        <div className="statsWrapper">
          <div className="alert alert-info" >
            <div className="statsValue">{t1} / {t8} / {t16} / {total} </div>
            <div>Wins / T8 / T16 / Total</div>
          </div>
          <div className="alert alert-info" >
            <div className="statsValue">
              {accounting.formatMoney(totalMoney, '$', 0)}
            </div>
            <div>Total Money</div>
          </div>
          <div className="alert alert-info" >
            <div className="statsValue">
              {totalPoints}
            </div>
            <div>Total Pro Points</div>
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
            {_.map(p.tournaments, function(t, index) {
              var tdata = window.Tournaments[t.tid];
              if (!tdata) { return null; }
              var c = null;
              if (t.finish === 1) {
                c = 'success';
              } else if (tdata.team && t.finish <= 4) {
                c = 'warning';
              } else if (!tdata.team && t.finish <= 8) {
                c = 'warning';
              }
              return (
                <tr key={index} className={c}>
                  <td>{tdata.date}</td>
                  <td>
                    <Link to="tournament" params={{id: t.tid}}>
                      {tdata.name}
                    </Link>
                  </td>
                  <td>{t.finish}</td>
                  <td>{t.propoints}</td>
                  <td>
                    {t.money ? accounting.formatMoney(t.money, '$', 0) : null}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
});

var Tournament = React.createClass({
  mixins: [Router.State],
  render: function() {
    var id = this.getParams().id;
    var t = window.Tournaments[id];
    if (!t) {
      return (<NotFound />);
    }
    return (
      <div className="col-md-offset-3 col-md-6">
        <DocumentTitle title={t.name} />
        <div className="page-header pageHeader">
          <h1>
            {t.coverage ? (
              <a href={t.coverage}>{t.name}</a>
            ) : t.name}
          </h1>
          <p className="lead tournamentLead">
            {t.formats.join(' / ')}
          </p>
          <p className="lead tournamentLead">
            {t.date}
          </p>
          <p className="lead tournamentLead">
            {t.location}
          </p>
        </div>
        <table className="table standingsTable table-hover">
          <thead>
            <tr>
              <th></th>
              <th>Player</th>
              <th>Pro Points</th>
              <th>Prize Money</th>
            </tr>
          </thead>
          <tbody>
            {_.map(t.standings, function(p, index) {
              var c = null;
              if (t.team2hg) {
                index = (index / 2) | 0;
              }
              else if (t.team) {
                index = (index / 3) | 0;
              }
              var top_limit = t.team ? 4 : 8;
              if (index === 0) {
                c = 'success';
              } else if (index < top_limit) {
                c = 'warning';
              }
              return (
                <tr className={c} key={p.id}>
                  <td>{index + 1}</td>
                  <td>
		    <Link to="player" params={{id: p.id}}>{p.name}</Link>{' '}
                    {p.report ? (
                      <a href={p.report}>(report)</a>
                    ) : null}
                  </td>
                  <td>{p.propoints}</td>
                  <td>
                    {p.money ? accounting.formatMoney(p.money, '$', 0) : null}
                  </td>
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
                  <Link to="tournament" params={{id: id}}>
                    {tournament.name}
                  </Link>
                </div>
                <div className="panel-body recentTournament">
                  <div className="image">
                    {that._renderLogo(id, tournament)}
                    {tournament.formats.join(' / ')}
                    {tournament.date}
                    {tournament.location}
                  </div>
                  <ul className={tournament.team ? (tournament.team2hg ? 'topfour topfour2hg' : 'topfour') : 'topeight'}>
                    {
                      _.map(tournament.top, function(player, idx) {
                        idx = Helper.getPlayerIndex(
                          idx,
                          tournament.team,
                          tournament.team2hg
                        );
                        return (
                          <li key={player.id}>
                            <span>{idx + 1}{'. '}</span>
                            <Link to="player" params={{id: player.id}}>
                              {player.name}
                            </Link>
                          </li>
                        );
                      })
                    }
                  </ul>
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
      <Link to="tournament" params={{id: id}}>
        <img src={'/logo/' + t.logo} />
      </Link>
    );
  }
});

var routes = (
  <Route handler={App} path="/">
    <Route name="player" path="player/:id" handler={Player} />
    <Route name="tournament" path="/tournament/:id" handler={Tournament} />
    <DefaultRoute name="default" handler={RecentTournaments} />
    <NotFoundRoute name="notfound" handler={NotFound} />
  </Route>
);

Router.run(routes, Router.HistoryLocation, function(Handler) {
  React.render(<Handler />, document.getElementById('approot'));
});
