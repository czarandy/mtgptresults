'use strict';

module.exports = {

  /**
   * Returns the player index for a given event type.
   *
   * @param {Integer} zero-based index
   * @param {Boolean} weather the event is a team event
   * @param {Boolean} weather the event is a two headed giant event
   * @returns {Integer} zero-based index
   *
   */

  getPlayerIndex: function(index, team, team2hg) {
    var persons;

    if (team && team2hg) {
      persons = 2;
    } else if (team) {
      persons = 3;
    } else {
      persons = 1;
    }

    return Math.floor(index / persons);
  }
};
