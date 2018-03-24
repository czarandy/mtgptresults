'use strict';

import accounting from 'accounting';

export const formatMoney = amount =>
  amount && accounting.formatMoney(amount, '$', 0);
