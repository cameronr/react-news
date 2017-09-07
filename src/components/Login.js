import React from 'react';
import PropTypes from 'prop-types';
import { Alert, Button, Modal } from 'react-bootstrap';

import Actions from '../actions/Actions';
import FieldGroup from '../components/FieldGroup';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      submitted: false,
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

  onLogin = (e) => {
    e.preventDefault();
    const { email, password } = this.state;

    this.setState({
      submitted: true,
    });

    Actions.login({
      email,
      password,
    });
  }

  onKeyPress = (e) => {
    // prevent submission on form eneter
    if (e.key === 'Enter') {
      e.preventDefault();
      this.onLogin(e);
    }
  }

  clearForm = () => {
    this.setState({
      email: '',
      password: '',
    });
  }


  render() {
    const { submitted, email, password } = this.state;
    const { errorMessage } = this.props;

    const error = errorMessage && (
      <Alert bsStyle="danger">{ errorMessage }</Alert>
    );

    return (
      <div>
        <Modal.Body>
          { error }
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
          <Button bsStyle="primary" onClick={this.onLogin} disabled={submitted}>
            Sign In
          </Button>
        </Modal.Footer>
      </div>
    );
  }
}

Login.propTypes = {
  onHide: PropTypes.func.isRequired,
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    uid: PropTypes.string.isRequired,
    isLoggedIn: PropTypes.bool.isRequired,
    md5hash: PropTypes.string.optional,
  }).isRequired,
  errorMessage: PropTypes.string,
};

Login.defaultProps = {
  errorMessage: '',
};

export default Login;
