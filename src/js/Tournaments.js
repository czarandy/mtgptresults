'use strict';

// Injected global data
const Tournaments = window.Tournaments;

const TournamentsArray = [];
for (let key in Tournaments) {
  const t = Tournaments[key];
  TournamentsArray.push({
    id: t.id,
    name: t.name + ' (' + t.date.substr(-4) + ')'
  });
}

const asArray = () => TournamentsArray;
export default {asArray};
