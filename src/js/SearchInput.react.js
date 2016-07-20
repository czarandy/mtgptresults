'use strict';

import React from 'react';
import {findDOMNode} from 'react-dom';
import {browserHistory} from 'react-router';
import Players from './Players.js';

export default class SearchInput extends React.Component {
  render() {
    return (
      <input
        type="text"
        className="searchInput form-control"
        placeholder="Search"
        autoComplete="off"
        ref="input"
      />
    );
  }

  componentDidMount() {
    const ts = [];
    for (let k in window.Tournaments) {
      const t = window.Tournaments[k];
      ts.push({
        id: t.id,
        name: t.name + ' (' + t.date.substr(-4) + ')'
      });
    }
    $(findDOMNode(this)).typeahead({
      source: ts.concat(Players.asArray()),
      afterSelect: item => {
        if (item.tournaments) {
          browserHistory.push('/player/' + item.id);
        } else {
          browserHistory.push('/tournament/' + item.id);
        }
        this.refs.input.value = '';
      }
    });
  }
}
