import React from 'react';
import Reflux from 'reflux';
import PropTypes from 'prop-types';

import Actions from '../actions/Actions';
import CommentFormStore from '../stores/CommentFormStore';

import Spinner from './Spinner';

class CommentForm extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      submitted: false,
      commentText: '',
      errorMessage: ''
    };

    Reflux.listenTo(CommentFormStore, 'onError')
  }

  componentWillReceiveProps(nextProps) {
    let oldUserSubmitted = this.props.user.submitted;
    let newUserSubmitted = nextProps.user.submitted;

    if (oldUserSubmitted !== newUserSubmitted) {
      // clear form if user's comment comes through
      this.setState({
        commentText: '',
        submitted: false
      });
    }
  }

  onError(commentFormData) {
    this.setState({
      errorMessage: commentFormData.errorMessage,
      submitted: false
    });
  }

  addComment = (e) => {
    e.preventDefault();
    let { commentText } = this.state;
    let { user, post } = this.props;

    if (!user.isLoggedIn) {
      return Actions.showModal('login', 'LOGIN_REQUIRED');
    }

    if (!commentText) {
      return Actions.commentFormError('NO_COMMENT');
    }

    this.setState({
      submitted: true
    });

    let comment = {
      postId: post.id,
      postTitle: post.title,
      text: commentText.trim(),
      creator: user.username,
      creatorUID: user.uid,
      time: Date.now()
    };

    Actions.addComment(comment);
  }

  render() {
    let {
      commentText,
      submitted,
      errorMessage
    } = this.state;

    let error = errorMessage && (
      <div className="comment-error error">{ errorMessage }</div>
    );

    return (
      <div>
        <form className="comment-form" onSubmit={ this.addComment }>
          <textarea
            placeholder="Post a Comment"
            ref="commentText"
            className="comment-input full-width"
            value={ commentText }
            onChange={ (e) => this.setState({ commentText: e.target.value }) }
          />
          <button type="submit" className="button button-primary" disabled={ submitted }>
            { submitted ? <Spinner /> : 'Submit' }
          </button>
        </form>
        { error }
      </div>
    );
  }
}

CommentForm.propTypes = {
  user: PropTypes.object,
  post: PropTypes.object,
  errorMessage: PropTypes.string
}

export default CommentForm;
