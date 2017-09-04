import React from 'react';
import Actions from '../actions/Actions';
import PropTypes from 'prop-types';
import Spinner from '../components/Spinner';

class Login extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      submitted: false,
      email: '',
      password: ''
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.user !== this.props.user) {
      // clear form if user prop changes (i.e. logged in)
      this.clearForm();
    }

    // allow resubmission if error comes through
    this.setState({
      submitted: false
    });
  }

  clearForm = () => {
    this.setState({
      email: '',
      password: ''
    });
  }

  login = (e) => {
    e.preventDefault();
    const { email, password } = this.state;

    this.setState({
      submitted: true
    });

    Actions.login({
      email: email,
      password: password
    });
  }

  render() {
    const { submitted, email, password } = this.state;
    const { errorMessage } = this.props;

    const error = errorMessage && (
      <div className="error modal-form-error">{ errorMessage }</div>
    );

    return (
      <div className="login">
        <h1>Login</h1>
        <form onSubmit={ this.login } className="modal-form">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            placeholder="Email"
            id="email"
            value={ email }
            onChange={ (e) => this.setState({ email: e.target.value.trim() }) }
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            placeholder="Password"
            id="password"
            value={ password }
            onChange={ (e) => this.setState({ password: e.target.value }) }
          />
          <button type="submit" className="button button-primary" disabled={ submitted }>
            { submitted ? <Spinner /> : 'Sign In' }
          </button>
        </form>
        { error }
      </div>
    );
  }
}

Login.propTypes = {
  user: PropTypes.object.isRequired,
  errorMessage: PropTypes.string
}

export default Login;
