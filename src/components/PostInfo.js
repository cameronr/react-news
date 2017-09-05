import React from 'react';
import PropTypes from 'prop-types';

import Actions from '../actions/Actions';

import Upvote from './Upvote';
import PostCommentsLink from './PostCommentsLink';
import PostTimeAgo from './PostTimeAgo';
import PostCreatorLink from './PostCreatorLink';
import PostDeleteLink from './PostDeleteLink';

const PostInfo = (props) => {
  const { user, post, showCommentsLink } = props;

  const userUpvoted = user.upvoted || {};
  const creatorIsLoggedIn = user.uid === post.creatorUID;

  const upvoteActions = {
    upvote: Actions.upvotePost,
    downvote: Actions.downvotePost,
  };

  return (
    <div className="post-info">
      <Upvote
        upvoteActions={upvoteActions}
        user={user}
        itemId={post.id}
        isUpvoted={!!userUpvoted[post.id]}
        upvotes={post.upvotes || 0}
      />
      <PostCreatorLink creator={post.creator} />
      <PostTimeAgo time={post.time} />
      { showCommentsLink ? <PostCommentsLink id={post.id} commentCount={post.commentCount || 0} /> : '' }
      { creatorIsLoggedIn && <PostDeleteLink post={post} /> }
    </div>
  );
};

PostInfo.propTypes = {
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

PostInfo.defaultProps = {
  showCommentsLink: true,
};

export default PostInfo;
