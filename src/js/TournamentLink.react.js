'use strict';

import React from 'react';
import {Link} from 'react-router';

const TournamentLink = ({tournament}) => (
  <span>
    <Link to={'/tournament/' + tournament.id}>{tournament.name}</Link>
  </span>
);
export default TournamentLink;
