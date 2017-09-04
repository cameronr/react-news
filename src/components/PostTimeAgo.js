import React from 'react';
import PropTypes from 'prop-types';
import timeAgo from '../util/timeAgo';

const PostTimeAgo = ({ time }) => (
    <span className="post-info-item">
        { timeAgo(time) }
    </span>
);

PostTimeAgo.propTypes = {
    time: PropTypes.number.isRequired
};

export default PostTimeAgo;
