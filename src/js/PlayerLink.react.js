'use strict';

const Flag = require('./Flag.react.js');
const Link = require('react-router').Link;
const React = require('react');

const PlayerLink = ({player, hideFlag}) => (
  <span>
    {player.flag && !hideFlag ? <Flag flag={player.flag} /> : null}
    <Link to={'/player/' + player.id}>
      {player.name}
    </Link>
  </span>
);

module.exports = PlayerLink;
