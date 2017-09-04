import React from 'react';
import PropTypes from 'prop-types';

import Actions from '../actions/Actions';

import Upvote from './Upvote';
import PostCommentsLink from './PostCommentsLink';
import PostTimeAgo from './PostTimeAgo';
import PostCreatorLink from './PostCreatorLink';
import PostDeleteLink from './PostDeleteLink';

class PostLink extends React.Component {
  render() {
    const { user, post } = this.props;

    let userUpvoted = user.upvoted || {};
    let creatorIsLoggedIn = user.uid === post.creatorUID;

    let upvoteActions = {
      upvote: Actions.upvotePost,
      downvote: Actions.downvotePost
    };

    return (
      <div className="post-info">
        <Upvote
          upvoteActions={ upvoteActions }
          user={ user }
          itemId={ post.id }
          isUpvoted={ !!userUpvoted[post.id] }
          upvotes={ post.upvotes || 0 }
        />
        <PostCreatorLink creator={ post.creator } />
        <PostTimeAgo time={ post.time } />
        <PostCommentsLink id={ post.id } commentCount={ post.commentCount || 0 } />
        { creatorIsLoggedIn && <PostDeleteLink post={ post } /> }
      </div>
    );
  }
}

PostLink.propTypes = {
  user: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired
}

export default PostLink;
