import React from 'react';
import Reflux from 'reflux';
import PropTypes from 'prop-types';
import { withRouter } from "react-router-dom";

import Actions from '../actions/Actions';

import UserStore from '../stores/UserStore';
import ProfileStore from '../stores/ProfileStore';

import Spinner from '../components/Spinner';
import Post from '../components/Post';
import Comment from '../components/Comment';

class Profile extends Reflux.Component {
  constructor(props) {
    super(props);
    this.state = {
      profileData: ProfileStore.getDefaultData(),
      loading: true
    };
    this.stores = [ProfileStore]
  }

  componentDidMount() {
    let username = this.props.match.params.username;

    // watch posts/comments for username in url
    UserStore.getUserId(username)
      .then(Actions.watchProfile);
  }

  componentWillReceiveProps(nextProps) {
    let oldUsername = this.props.match.params.username;
    let newUsername = nextProps.match.params.username;

    if (oldUsername !== newUsername) {
      this.setState({
        loading: true
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
    let { profileData, loading } = this.state;
    let { user } = this.props;
    let posts = profileData.posts;
    let comments = profileData.comments;

    let postList, commentList, postHeader, commentsHeader;

    if (loading) {
      postHeader = <h2>Loading Posts...</h2>;
      postList = <Spinner />;
      commentsHeader = <h2>Loading Comments...</h2>;
      commentList = <Spinner />;
    } else {
      postHeader = <h2>{ posts.length ? 'Latest' : 'No'} Posts</h2>;
      commentsHeader = <h2>{ comments.length ? 'Latest' : 'No'} Comments</h2>;

      postList = posts.map(post => (
        <Post
          post={ post }
          user={ user }
          key={ post.id }
        />
      ));

      commentList = comments.map(comment => (
        <Comment
          showPostTitle
          comment={ comment }
          user={ user }
          key={ comment.id }
        />
      ));
    }

    let userOptions = user.uid === profileData.userId && user.uid !== "" && (
      <div className="user-options text-right">
        <button
          onClick={ this.logout }
          className="button button-primary"
        >
          Sign Out
        </button>
        <hr />
      </div>
    );

    return (
      <div className="content full-width">
        { userOptions }
        <h1>{ this.props.match.params.username + '\'s' } Profile</h1>
        <div className="user-posts">
          { postHeader }
          { postList }
        </div>
        <div className="user-comments">
          { commentsHeader }
          { commentList }
        </div>
      </div>
    );
  }

}

Profile.propTypes = {
  params: PropTypes.object,
  user: PropTypes.object.isRequired
}

export default withRouter(Profile);
