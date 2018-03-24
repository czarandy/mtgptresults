"use strict";

import React from "react";
import { render } from "react-dom";
import {
  Router,
  Route,
  IndexRoute,
  browserHistory,
  applyRouterMiddleware
} from "react-router";
import { useScroll } from "react-router-scroll";

import NotFound from "./NotFound.react.js";
import Page from "./Page.react.js";
import Player from "./Player.react.js";
import Tournament from "./Tournament.react.js";
import Rankings from "./Rankings.react.js";
import RecentTournaments from './RecentTournaments.react.js';

render(
  <Router history={browserHistory} render={applyRouterMiddleware(useScroll())}>
    <Route path="/" component={Page}>
      <IndexRoute component={RecentTournaments} />
      <Route path="/player/:id" component={Player} />
      <Route path="/tournament/:id" component={Tournament} />
      <Route path="/rankings/:col" component={Rankings} />
      <Route path="*" component={NotFound} />
    </Route>
  </Router>,
  document.getElementById("approot")
);
