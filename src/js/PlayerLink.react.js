'use strict';

import React from 'react';
import {Link} from 'react-router';

import Flag from './Flag.react.js';

const PlayerLink = ({player, hideFlag}) => (
  <span>
    {player.flag && !hideFlag ? <Flag flag={player.flag} nationality={player.nationality} /> : null}
    <Link to={'/player/' + player.id}>
      {player.name}
    </Link>
  </span>
);
export default PlayerLink;
