import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const PostCreatorLink = ({ creator }) => (
  <span>
    <Link to={`/user/${creator}`}>{ creator }</Link>
  </span>
);

PostCreatorLink.propTypes = {
  creator: PropTypes.string.isRequired,
};

export default PostCreatorLink;
