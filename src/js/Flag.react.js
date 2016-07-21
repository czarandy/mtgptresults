'use strict';

const React = require('react');

const Flag = ({flag, nationality}) => (
  <span
    aria-hidden={true}
    className={'flag-icon flag-icon-' + flag}
    title={nationality}>
  </span>
);

export default Flag;
