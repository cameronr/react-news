import React from 'react';
import PropTypes from 'prop-types';
import PostLink from './PostLink';
import PostInfo from './PostInfo';
import Upvote from './Upvote';
import Actions from '../actions/Actions';

const Post = (props) => {
  const { user, post, showCommentsLink } = props;

  if (post.isDeleted) {
    // post doesn't exist
    return (
      <div className="post cf">
        <div className="post-link">
          [deleted]
        </div>
      </div>
    );
  }

  const userUpvoted = user.upvoted || {};
  const upvoteActions = {
    upvote: Actions.upvotePost,
    downvote: Actions.downvotePost,
  };

  return (
    <div className="post">
      <Upvote
        upvoteActions={upvoteActions}
        user={user}
        itemId={post.id}
        isUpvoted={!!userUpvoted[post.id]}
        upvotes={post.upvotes || 0}
      />
      <div className="post-content">
        <PostLink title={post.title} postId={post.id} url={post.url} />
        <PostInfo post={post} user={user} showCommentsLink={showCommentsLink} />
      </div>
    </div>
  );
};

Post.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    uid: PropTypes.string.isRequired,
    isLoggedIn: PropTypes.bool.isRequired,
    md5hash: PropTypes.string.optional,
  }).isRequired,
  post: PropTypes.shape({
    id: PropTypes.string.isrequired,
    upvotes: PropTypes.number.optional,
    commentCount: PropTypes.number.optional,
  }).isRequired,
  showCommentsLink: PropTypes.bool,
};

Post.defaultProps = {
  showCommentsLink: true,
};

export default Post;
