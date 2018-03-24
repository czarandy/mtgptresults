"use strict";

import React from "react";
import DocumentTitle from "react-document-title";

import NotFound from "./NotFound.react.js";
import PlayerLink from "./PlayerLink.react.js";
import Tournaments from "./Tournaments.js";
import { formatMoney } from "./utils.js";
import Players from "./Players.js";

const Tournament = props => {
  const id = props.params.id;
  const t = Tournaments.byID(id);
  if (!t) {
    return <NotFound />;
  }
  return (
    <div className="col-md-offset-3 col-md-6">
      <DocumentTitle title={t.name} />
      <div className="page-header pageHeader">
        <h1>{t.coverage ? <a href={t.coverage}>{t.name}</a> : t.name}</h1>
        <p className="lead tournamentLead">{t.formats.join(" / ")}</p>
        <p className="lead tournamentLead">{t.date}</p>
        <p className="lead tournamentLead">{t.location}</p>
      </div>
      <table className="table standingsTable table-hover">
        <thead>
          <tr>
            <th />
            <th>Player</th>
            <th>Pro Points</th>
            <th>Prize Money</th>
          </tr>
        </thead>
        <tbody>
          {t.standings.map((p, index) => {
            return (
              <tr className={t.getPlayerClassName(index)} key={p.id}>
                <td>{p.rank || t.getPlayerIndex(index) + 1}</td>
                <td>
                  <PlayerLink player={Players.byID(p.id)} />{" "}
                  {p.report ? <a href={p.report}>(report)</a> : null}
                </td>
                <td>{p.propoints}</td>
                <td>{formatMoney(p.money)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Tournament;
