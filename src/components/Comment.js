import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Actions from '../actions/Actions';

import Upvote from './Upvote';
import timeAgo from '../util/timeAgo';

const Comment = (props) => {
  const { user, comment, showPostTitle } = props;
  const userUpvoted = user.upvoted || {};

  const postLink = showPostTitle && (
    <span className="post-info-item post-link">
      <Link to={`/post/${comment.postId}`}>{comment.postTitle}</Link>
    </span>
  );

  const deleteOption = user.uid === comment.creatorUID && (
    <span className="delete post-info-item">
      <a onClick={() => Actions.deleteComment(comment)}>delete</a>
    </span>
  );

  const upvoteActions = {
    upvote: Actions.upvoteComment,
    downvote: Actions.downvoteComment,
  };

  return (
    <div className="comment cf divider">
      <Upvote
        upvoteActions={upvoteActions}
        user={user}
        itemId={comment.id}
        isUpvoted={!!userUpvoted[comment.id]}
        upvotes={comment.upvotes || 0}
      />
      <div className="comment-content">
        <div className="comment-text">
          { comment.text }
        </div>

        <div className="comment-info">
          <div className="posted-by">
            <span>
              <Link to={`/user/${comment.creator}`}>
                { comment.creator }
              </Link>
            </span>
            <span className="post-info-item">
              { timeAgo(comment.time) }
            </span>
            { postLink }
            { deleteOption }
          </div>
        </div>
      </div>
    </div>
  );
};

Comment.propTypes = {
  user: PropTypes.object.isRequired,
  comment: PropTypes.object.isRequired,
  showPostTitle: PropTypes.bool,
};

export default Comment;
