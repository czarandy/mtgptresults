"use strict";

import React from "react";
import { Link } from "react-router";
import DocumentTitle from "react-document-title";
import Players from "./Players.js";
import PlayerLink from "./PlayerLink.react.js";

const _ = require("underscore");
const Helper = require("./../../lib/helper.js");

const Logo = ({ id, t }) => {
  if (!t.logo) {
    return null;
  }
  return (
    <Link to={"/tournament/" + id}>
      <img src={"/logo/" + t.logo} />
    </Link>
  );
};

const RecentTournaments = () => (
  <div className="col-md-offset-3 col-md-6">
    <div className="alert alert-info" role="alert">
      {"This site is now open source on "}
      <a className="alert-link" href="https://github.com/czarandy/mtgptresults">
        GitHub
      </a>.
    </div>
    <DocumentTitle title="MTG Pro Tour Results" />
    {_.map(window.Recent, function(tournament) {
      const id = tournament.id;
      return (
        <div key={id}>
          <div className="panel panel-default recentTournamentWrapper">
            <div className="panel-heading">
              <Link to={"/tournament/" + id}>{tournament.name}</Link>
            </div>
            <div className="panel-body recentTournament">
              <div className="row">
                <div className="col-sm-5">
                  <div className="image">
                    <Logo id={id} t={tournament} />
                    <p>
                      {tournament.formats.join(" / ")}
                      <br />
                      {tournament.date}
                      <br />
                      {tournament.location}
                    </p>
                  </div>
                </div>
                <div className="col-sm-7">
                  <ul className="List">
                    {_.map(tournament.top, function(player, idx) {
                      idx = Helper.getPlayerIndex(idx, tournament.teamsize);
                      return (
                        <li
                          className={
                            idx === 0
                              ? "List-item List-item--big"
                              : "List-item "
                          }
                          key={player.id}
                        >
                          <span className="List-index">
                            {idx + 1}
                            {". "}
                          </span>
                          <PlayerLink player={Players.byID(player.id)} />
                        </li>
                      );
                    })}
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

export default RecentTournaments;
