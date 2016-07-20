'use strict';

import React from 'react';
import {Link, IndexLink} from 'react-router';
import SearchInput from './SearchInput.react.js';

const Page = props => (
  <div>
    <div className="navbar navbar-default">
      <div className="container-fluid">
        <div className="navbar-header">
          <IndexLink className="navbar-brand" to="/">
            MTG Pro Tour Results
          </IndexLink>
        </div>
        <ul className="nav navbar-nav">
          <li>
            <Link to="/rankings/t8" activeClassName="activeLink">
              Player Rankings
            </Link>
          </li>
        </ul>
        <div className="navbar-form navbar-right">
          <SearchInput />
        </div>
      </div>
    </div>
    {props.children}
  </div>
);

export default Page;
