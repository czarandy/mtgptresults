'use strict';

import React from 'react';
import {Link} from 'react-router';

import Flag from './Flag.react.js';
import HallOfFameIcon from './HallOfFameIcon.react.js';

const PlayerLink = ({player, hideFlag}) => (
  <span>
    {player.flag && !hideFlag ? (
      <Flag flag={player.flag} nationality={player.nationality} />
    ) : null}
    <Link to={'/player/' + player.id}>{player.name}</Link>
    {player.hof ? <HallOfFameIcon /> : null}
  </span>
);
export default PlayerLink;
