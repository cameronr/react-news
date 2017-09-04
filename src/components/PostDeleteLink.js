import React from 'react';
import PropTypes from 'prop-types';
import Actions from '../actions/Actions';

const PostDeleteLink = ({ post }) => (
    <span className="delete post-info-item">
        <a onClick={ () => Actions.deletePost(post) }>delete</a>
    </span>
);

PostDeleteLink.propTypes = {
    post: PropTypes.object.isRequired
};

export default PostDeleteLink;
