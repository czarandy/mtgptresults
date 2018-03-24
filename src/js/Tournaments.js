"use strict";

import Tournament from "./Tournament.js";

// Injected global data
const Tournaments = window.Tournaments;

const TournamentsArray = [];
for (let key in Tournaments) {
  const t = Tournaments[key];
  TournamentsArray.push({
    id: t.id,
    name: t.name + " (" + t.date.substr(-4) + ")"
  });
}

const byID = id => {
  if (Tournaments[id]) {
    return new Tournament(Tournaments[id]);
  }
  return null;
};

const asArray = () => TournamentsArray;
export default { asArray, byID };
