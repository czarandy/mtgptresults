'use strict';

var ava = require('ava');
var H = require('./../lib/helper.js');

ava('Calculates player index.', function(t) {
  t.is(H.getPlayerIndex(0, 1), 0, 'single');
  t.is(H.getPlayerIndex(1, 1), 1);
  t.is(H.getPlayerIndex(2, 1), 2);
  t.is(H.getPlayerIndex(0, 3), 0, 'team');
  t.is(H.getPlayerIndex(1, 3), 0);
  t.is(H.getPlayerIndex(2, 3), 0);
  t.is(H.getPlayerIndex(0, 2), 0, '2 headed giant');
  t.is(H.getPlayerIndex(1, 2), 0);
  t.is(H.getPlayerIndex(2, 2), 1);
});

ava('Parses custom date.', function(t) {
  t.is(H.getDate('January 1, 1970'), 0);
  t.is(
    (H.getDate('February 16-8, 1996') < H.getDate('May 5-7, 1996')),
    true
  );
});

