import React from 'react';
import PropTypes from 'prop-types';

import PostCommentsLink from './PostCommentsLink';
import PostTimeAgo from './PostTimeAgo';
import PostCreatorLink from './PostCreatorLink';
import PostDeleteLink from './PostDeleteLink';

const PostInfo = (props) => {
  const { user, post, showCommentsLink } = props;

  const creatorIsLoggedIn = user.uid === post.creatorUID;


  return (
    <div className="post-info">
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
