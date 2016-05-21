'use strict';

var ava = require('ava');
var H = require('./../lib/helper.js');

ava('Calculates player index.', function(t) {
  t.is(H.getPlayerIndex(0, false, false), 0, 'single');
  t.is(H.getPlayerIndex(1, false, false), 1);
  t.is(H.getPlayerIndex(2, false, false), 2);
  t.is(H.getPlayerIndex(0, true, false), 0, 'team');
  t.is(H.getPlayerIndex(1, true, false), 0);
  t.is(H.getPlayerIndex(2, true, false), 0);
  t.is(H.getPlayerIndex(0, true, true), 0, '2 headed giant');
  t.is(H.getPlayerIndex(1, true, true), 0);
  t.is(H.getPlayerIndex(2, true, true), 1);
});

ava('Parses custom date.', function(t) {
  t.is(H.getDate('January 1, 1970'), 0);
  t.is(
    (H.getDate('February 16-8, 1996') < H.getDate('May 5-7, 1996')),
    true
  );
});

