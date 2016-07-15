'use strict';

const Flag = require('./Flag.react.js');
const Link = require('react-router').Link;
const React = require('react');

const PlayerLink = ({player}) => (
  <span>
    {player.flag ? <Flag flag={player.flag} /> : null}
    <Link to="player" params={{id: player.id}}>
      {player.name}
    </Link>
  </span>
);

module.exports = PlayerLink;
