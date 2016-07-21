'use strict';

import accounting from 'accounting';

export const formatMoney = amount => accounting.formatMoney(amount, '$', 0);
