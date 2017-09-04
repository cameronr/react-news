import React from 'react';
import Reflux from 'reflux';
import PropTypes from 'prop-types';
import { withRouter } from "react-router-dom";

import SingleStore from '../stores/SingleStore';
import Actions from '../actions/Actions';
import Spinner from '../components/Spinner';
import Post from '../components/Post';
import Comment from '../components/Comment';
import CommentForm from '../components/CommentForm';

import pluralize from '../util/pluralize';

class SinglePost extends Reflux.Component {

  constructor(props) {
    super(props);
    // TODO: should post be a prop instead?
    this.state = {
      post: null,
      comments: [],
      loading: true
    };
    this.stores = [SingleStore]
  }

  componentDidMount() {
    const { postId } = this.props.match.params;
    Actions.watchPost(postId);
  }

  componentWillReceiveProps(nextProps) {
    const oldPostId = this.props.match.params.postId;
    const newPostId = nextProps.match.params.postId;

    if (newPostId !== oldPostId) {
      // TODO: shouldn't be setting state here
      this.setState({
        loading: true
      });

      Actions.stopWatchingPost(oldPostId);
      Actions.watchPost(newPostId);
    }
  }

  componentWillUnmount() {
    super.componentWillUnmount();
    const { postId } = this.props.match.params;
    Actions.stopWatchingPost(postId);
  }

  render() {
    const { loading, post, comments } = this.state;
    const { user } = this.props;
    const { postId } = this.props.match.params;

    let content;

    if (loading) {
      content = <Spinner />;
    } else {
      let commentComponents = comments.map(comment => (
        <Comment comment={ comment } user={ user } key={ comment.id } />
      ));

      content = (
        <div>
          <Post post={ post } user={ user } key={ postId } />
          <div className="comments">
            <h2>{ pluralize(comments.length, 'Comment') }</h2>
            { commentComponents }
          </div>
        </div>
      );
    }

    return (
      <div className="content full-width">
        { content }
        <CommentForm
          user={ user }
          post={ post || {} }
        />
      </div>
    );
  }
}

SinglePost.propTypes = {
  params: PropTypes.object,
  user: PropTypes.object.isRequired
}

export default withRouter(SinglePost);
