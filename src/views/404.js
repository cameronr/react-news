import React from 'react';
import { Link } from 'react-router-dom'

const PageNotFound = () => (
  <div className="content full-width">
    <h1>{ 'That Page Doesn\'t Exist' }</h1>
    <p><Link to="/">Return to the homepage</Link></p>
  </div>
);

export default PageNotFound;
