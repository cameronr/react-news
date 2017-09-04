import React from 'react';
import PropTypes from 'prop-types';
import PostLink from './PostLink';
import PostInfo from './PostInfo';

class Post extends React.Component {

  render() {
    const { user, post } = this.props;

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

    return (
      <div className="post">
        <PostLink title={ post.title } url={ post.url } />
        <PostInfo post={ post } user={ user } />
      </div>
    );
  }
}

Post.propTypes = {
  user: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired
}

export default Post;
