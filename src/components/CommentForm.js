import React from 'react';
import Reflux from 'reflux';
import PropTypes from 'prop-types';
import { Button, FormControl, FormGroup } from 'react-bootstrap';

import Actions from '../actions/Actions';
import CommentFormStore from '../stores/CommentFormStore';

import Spinner from './Spinner';

class CommentForm extends Reflux.Component {
  constructor(props) {
    super(props);

    this.state = {
      submitted: false,
      commentText: '',
      errorMessage: '',
    };

    this.store = CommentFormStore;
  }

  componentWillReceiveProps(nextProps) {
    const oldUserSubmitted = this.props.user.submitted;
    const newUserSubmitted = nextProps.user.submitted;

    if (oldUserSubmitted !== newUserSubmitted) {
      // clear form if user's comment comes through
      this.setState({
        commentText: '',
        submitted: false,
      });
    }
  }

  onError(commentFormData) {
    this.setState({
      errorMessage: commentFormData.errorMessage,
      submitted: false,
    });
  }

  addComment = (e) => {
    e.preventDefault();
    const { commentText } = this.state;
    const { user, post } = this.props;

    if (!user.isLoggedIn) {
      return Actions.showModal('login', 'LOGIN_REQUIRED');
    }

    if (!commentText) {
      return Actions.commentFormError('NO_COMMENT');
    }

    this.setState({
      submitted: true,
    });

    const comment = {
      postId: post.id,
      postTitle: post.title,
      text: commentText.trim(),
      creator: user.username,
      creatorUID: user.uid,
      time: Date.now(),
    };

    Actions.addComment(comment);
    return null;
  }

  render() {
    const {
      commentText,
      submitted,
      errorMessage,
    } = this.state;

    const error = errorMessage && (
      <div className="comment-error error">{ errorMessage }</div>
    );

    return (
      <div>
        <form onSubmit={this.addComment}>
          <FormGroup controlId="formControlsTextarea">
            <FormControl
              componentClass="textarea"
              placeholder="Post a comment"
              value={commentText}
              onChange={e => this.setState({ commentText: e.target.value })}
            />
          </FormGroup>

          <Button type="submit">
            { submitted ? <Spinner /> : 'Submit' }
          </Button>
        </form>
        { error }
      </div>
    );
  }
}

CommentForm.propTypes = {
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
  errorMessage: PropTypes.string,
};

export default CommentForm;
