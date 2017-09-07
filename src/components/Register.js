import React from 'react';
import PropTypes from 'prop-types';
import { Alert, Button, Modal } from 'react-bootstrap';
import Spinner from 'react-spinner';

import Actions from '../actions/Actions';
import FieldGroup from '../components/FieldGroup';

class Register extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      submitted: false,
      username: '',
      email: '',
      password: '',
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.user !== this.props.user) {
      // clear form if user prop changes (i.e. logged in)
      this.clearForm();
    }

    // allow resubmission if error comes through
    this.setState({
      submitted: false,
    });
  }

  onRegister = (e) => {
    e.preventDefault();
    const { username, email, password } = this.state;

    if (!username) {
      return Actions.modalError('NO_USERNAME');
    }

    this.setState({
      submitted: true,
    });

    const loginData = {
      email,
      password,
    };

    return Actions.register(username, loginData);
  }

  onKeyPress = (e) => {
    // prevent submission on form eneter
    if (e.key === 'Enter') {
      e.preventDefault();
      this.onRegister(e);
    }
  }

  clearForm = () => {
    this.setState({
      username: '',
      email: '',
      password: '',
    });
  }


  render() {
    const { submitted, username, email, password } = this.state;
    const { errorMessage } = this.props;

    const error = errorMessage && (
      <Alert bsStyle="danger">{ errorMessage }</Alert>
    );

    return (
      <div>
        <Modal.Body>
          { error }
          <FieldGroup
            id="username"
            type="text"
            label="Username"
            placeholder="Enter username"
            value={username}
            onChange={e => this.setState({ username: e.target.value.trim() })}
            onKeyPress={this.onKeyPress}
          />
          <FieldGroup
            id="loginEmail"
            type="email"
            label="Email address"
            placeholder="Enter email"
            value={email}
            onChange={e => this.setState({ email: e.target.value.trim() })}
            onKeyPress={this.onKeyPress}
          />
          <FieldGroup
            id="loginPassword"
            label="Password"
            type="password"
            value={password}
            onChange={e => this.setState({ password: e.target.value.trim() })}
            onKeyPress={this.onKeyPress}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.props.onHide}>Cancel</Button>
          <Button bsStyle="primary" onClick={this.onRegister} disabled={submitted}>
            { submitted ? <Spinner /> : 'Register' }
          </Button>
        </Modal.Footer>
      </div>
    );
  }
}

Register.propTypes = {
  onHide: PropTypes.func.isRequired,
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    uid: PropTypes.string.isRequired,
    isLoggedIn: PropTypes.bool.isRequired,
    md5hash: PropTypes.string.optional,
  }).isRequired,
  errorMessage: PropTypes.string,
};

Register.defaultProps = {
  errorMessage: null,
};

export default Register;
