import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Nav, Navbar, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import Actions from '../actions/Actions';

const Header = (props) => {
  const rightNav = [];

  if (!props.user.isLoggedIn) {
    rightNav.push(
      <NavItem key="signin" onSelect={() => Actions.showModal('login')} >Sign In</NavItem>,
      <NavItem key="register" onSelect={() => Actions.showModal('register')} >Register</NavItem>,
      <NavItem key="newpost" onSelect={() => Actions.showModal('login', 'LOGIN_REQUIRED')} >+</NavItem>,
    );
  } else {
    const gravatarURI = 'http://www.gravatar.com/avatar/{props.user.md5hash}?d=mm';

    rightNav.push(
      <LinkContainer to={`/user/${props.user.username}`} key="profile">
        <NavItem>
          <span className="username">{props.user.username}</span>
          <img src={gravatarURI} className="profile-pic" alt="profile" />
        </NavItem>
      </LinkContainer>,
    );
    rightNav.push(<NavItem key="newpost" onSelect={() => Actions.showModal('newpost')} >+</NavItem>);
  }

  return (
    <Navbar collapseOnSelect fluid>
      <Navbar.Header>
        <Navbar.Brand>
          <Link to="/">React News</Link>
        </Navbar.Brand>
        <Navbar.Toggle />
      </Navbar.Header>
      <Navbar.Collapse>
        <Nav pullRight>
          {rightNav}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

Header.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    isLoggedIn: PropTypes.bool.isRequired,
    md5hash: PropTypes.string.optional,
  }).isRequired,
};

export default Header;

