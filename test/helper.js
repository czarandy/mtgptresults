'use strict';

var ava = require('ava');
var Helper = require('./../lib/helper.js');

ava('calculates player index', function(t) {
  t.is(Helper.getPlayerIndex(0, false, false), 0, 'single');
  t.is(Helper.getPlayerIndex(1, false, false), 1);
  t.is(Helper.getPlayerIndex(2, false, false), 2);
  t.is(Helper.getPlayerIndex(0, true, false), 0, 'team');
  t.is(Helper.getPlayerIndex(1, true, false), 0);
  t.is(Helper.getPlayerIndex(2, true, false), 0);
  t.is(Helper.getPlayerIndex(0, true, true), 0, '2 headed giant');
  t.is(Helper.getPlayerIndex(1, true, true), 0);
  t.is(Helper.getPlayerIndex(2, true, true), 1);
});
