"use strict";

module.exports = {
  /**
   * Returns the player index for a given event type.
   */
  getPlayerIndex: function(index, teamsize) {
    if (teamsize) {
      return Math.floor(index / teamsize);
    }
    return index;
  },

  /**
   * Returns the time for a given date string.
   *
   * @param {String} custom formated date string
   * @returns {Integer} time in milliseconds since January 1, 1970, 00:00:00 UTC
   *
   * REVIEW: Use https://www.npmjs.com/package/micro-strptime
   */

  getDate: function(date) {
    var year = date.substr(-4);
    var month = date.match(/\w+/)[0].substr(0, 3);
    var day = date.match(/\d+/)[0];

    return Date.parse(month + " " + day + ", " + year + " 00:00:00 GMT");
  }
};
