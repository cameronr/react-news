import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import pluralize from '../util/pluralize';

const CommentsLink = ({ id, commentCount }) => (
    <span className="post-info-item">
        <Link to={ `/post/${id}` }>
            { pluralize(commentCount, 'comment') }
        </Link>
    </span>
);

CommentsLink.propTypes = {
    id: PropTypes.string.isRequired,
    commentCount: PropTypes.number.isRequired
};

export default CommentsLink;
