import React from 'react';
import { Nav, Navbar, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router-dom'

import Actions from '../actions/Actions';
import ProfileLink from '../components/ProfileLink';


class Header extends React.Component {

  render() {

    let rightNav = [];

    if (!this.props.user.isLoggedIn) {
      rightNav.push(<NavItem key='signin' onSelect={ () => Actions.showModal('login') } >Sign In</NavItem>)
      rightNav.push(<NavItem key='register' onSelect={ () => Actions.showModal('register') } >Register</NavItem>)
      rightNav.push(<NavItem key='newpost' onSelect={ () => Actions.showModal('login', 'LOGIN_REQUIRED') } >+</NavItem>)
    } else {
      const gravatarURI = 'http://www.gravatar.com/avatar/' + this.props.user.md5hash + '?d=mm';

      rightNav.push(
        <NavItem key='profile'>
          <span className="username">{ this.props.user.username }</span>
          <img src={ gravatarURI } className="profile-pic" alt="profile" />
        </NavItem>
      );
      rightNav.push(<NavItem key='newpost' onSelect={ () => Actions.showModal('newpost') } >+</NavItem>)
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
  }
}

export default Header;

