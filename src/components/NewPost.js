import React from 'react';
import Reflux from 'reflux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Alert, Button, Modal } from 'react-bootstrap';
import Spinner from 'react-spinner';

import Actions from '../actions/Actions';
import FieldGroup from '../components/FieldGroup';

class NewPost extends Reflux.Component {
  constructor(props) {
    super(props);
    this.state = {
      submitted: false,
      title: '',
      link: '',
    };
  }

  componentWillReceiveProps(nextProps) {
    const oldLatestPost = this.props.user.latestPost;
    const newLatestPost = nextProps.user.latestPost;

    if (oldLatestPost !== newLatestPost) {
      // user just submitted a new post
      this.submitPostCompleted(newLatestPost);
      return;
    }

    this.setState({
      submitted: false,
    });
  }

  submitPostCompleted = (postId) => {
    // clear form
    this.setState({
      title: '',
      link: '',
      submitted: false,
    });

    // hide modal/redirect to the new post
    Actions.hideModal();
    this.props.history.push(`/post/${postId}`);
  }

  onKeyPress = (e) => {
    // prevent submission on form eneter
    if (e.key === 'Enter') {
      e.preventDefault();
      this.onRegister(e);
    }
  }

  onSubmitPost = (e) => {
    e.preventDefault();

    const { title, link } = this.state;
    const { user } = this.props;

    this.setState({
      submitted: true,
    });

    const post = {
      title: title.trim(),
      url: link,
      creator: user.username,
      creatorUID: user.uid,
      time: Date.now(),
    };

    Actions.submitPost(post);
  }

  render() {
    const { submitted, title, link } = this.state;

    const errorMessage = this.props.errorMessage;
    const error = errorMessage && (
      <Alert bsStyle="danger">{ errorMessage }</Alert>
    );

    return (
      <div>
        <Modal.Body>
          { error }
          <FieldGroup
            id="title"
            type="text"
            label="Title"
            placeholder="Title of the post"
            value={title}
            onChange={e => this.setState({ title: e.target.value })}
            onKeyPress={this.onKeyPress}
          />
          <FieldGroup
            id="link"
            type="text"
            label="Link"
            placeholder="Link"
            value={link}
            onChange={e => this.setState({ link: e.target.value.trim() })}
            onKeyPress={this.onKeyPress}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.props.onHide}>Cancel</Button>
          <Button bsStyle="primary" onClick={this.onSubmitPost} disabled={submitted}>
            { submitted ? <Spinner /> : 'Post' }
          </Button>
        </Modal.Footer>
      </div>
    );
  }
}

NewPost.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    uid: PropTypes.string.isRequired,
    isLoggedIn: PropTypes.bool.isRequired,
    md5hash: PropTypes.string.optional,
    latestPost: PropTypes.string.optional,
  }).isRequired,
  errorMessage: PropTypes.string,
};

NewPost.defaultProps = {
  md5hash: null,
  latestPost: null,
};

export default withRouter(NewPost);
