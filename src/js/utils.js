'use strict';

import accounting from 'accounting';

export const formatMoney = amount =>
  amount && accounting.formatMoney(amount, '$', 0);

export const filterOnlyProTours = item => item.type === 'Pro Tour';

export const filterOtherTournaments = item => item.type !== 'Pro Tour';
