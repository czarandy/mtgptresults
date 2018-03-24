'use strict';

import React from 'react';

const Flag = ({flag, nationality}) => (
  <span className={'flag-icon flag-icon-' + flag} title={nationality} />
);

export default Flag;
