'use strict';

const React = require('react');

const Flag = ({flag, nationality}) => (
  <span className={'flag-icon flag-icon-' + flag} title={nationality}></span>
);

export default Flag;
