import React from 'react';
import Reflux from 'reflux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Button, Panel } from 'react-bootstrap';
import Spinner from 'react-spinner';

import Actions from '../actions/Actions';

import UserStore from '../stores/UserStore';
import ProfileStore from '../stores/ProfileStore';

import Post from '../components/Post';
import Comment from '../components/Comment';

class Profile extends Reflux.Component {
  constructor(props) {
    super(props);
    this.state = {
      profileData: ProfileStore.getDefaultData(),
      loading: true,
    };
    this.stores = [ProfileStore];
  }

  componentDidMount() {
    const username = this.props.match.params.username;

    // watch posts/comments for username in url
    UserStore.getUserId(username)
      .then(Actions.watchProfile);
  }

  componentWillReceiveProps(nextProps) {
    const oldUsername = this.props.match.params.username;
    const newUsername = nextProps.match.params.username;

    if (oldUsername !== newUsername) {
      this.setState({
        loading: true,
      });

      Actions.stopWatchingProfile();
      UserStore.getUserId(newUsername)
        .then(Actions.watchProfile);
    }
  }

  componentWillUnmount() {
    super.componentWillUnmount();
    Actions.stopWatchingProfile();
  }

  logout = (e) => {
    e.preventDefault();
    Actions.logout();
  }

  render() {
    const { profileData, loading } = this.state;
    const { user } = this.props;
    const posts = profileData.posts;
    const comments = profileData.comments;
    const userProfile = this.props.match.params.username;

    let postList;
    let commentList;

    if (loading) {
      postList = <Spinner />;
      commentList = <Spinner />;
    } else {
      postList = posts.map(post => (
        <Post
          post={post}
          user={user}
          key={post.id}
        />
      ));
      if (!postList.length) {
        postList = 'No posts';
      }

      commentList = comments.map(comment => (
        <Comment
          showPostTitle
          comment={comment}
          user={user}
          key={comment.id}
        />
      ));
      if (!commentList.length) {
        commentList = 'No comments';
      }
    }

    const userOptions = user.uid === profileData.userId && user.uid !== '' && (
      <div className="text-right-sm">
        <Button onClick={this.logout}>
          Sign Out
        </Button>
      </div>
    );

    return (
      <Panel className="profile">
        <div className="row divider">
          <div className="col-12 col-sm-8">
            <h1 className="panel-body-top">
              { `${userProfile}'s` } Profile
            </h1>
          </div>
          <div className="col-12 col-sm-4">
            { userOptions }
          </div>
        </div>
        <div className="user-posts">
          <h3 className="section-header">Posts</h3>
          { postList }
        </div>
        <div className="user-comments">
          <h3 className="section-header">Comments</h3>
          { commentList }
        </div>
      </Panel>
    );
  }
}

Profile.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    uid: PropTypes.string.isRequired,
    isLoggedIn: PropTypes.bool.isRequired,
    md5hash: PropTypes.string.optional,
  }).isRequired,
};

export default withRouter(Profile);
