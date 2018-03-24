'use strict';

import React from 'react';
import DocumentTitle from 'react-document-title';

const NotFound = () => (
  <DocumentTitle title="MTG Pro Tour Results | Not Found">
    <div className="col-md-offset-3 col-md-6 container">
      <div className="jumbotron notFound">
        <h1>Not Found</h1>
        <p>Unfortunately, no content was found at this URL.</p>
      </div>
    </div>
  </DocumentTitle>
);

export default NotFound;
