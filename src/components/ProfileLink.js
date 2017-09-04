import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const ProfileLink = (props) => {
  const { username, md5hash } = props.user;
  const gravatarURI = 'http://www.gravatar.com/avatar/' + md5hash + '?d=mm';

  return (
    <Link to={ `/user/${username}` } className="">
      <span className="username">{ username }</span>
      <img src={ gravatarURI } className="profile-pic" alt="profile" />
    </Link>
  );
};

ProfileLink.propTypes = {
  user: PropTypes.object.isRequired
};

export default ProfileLink;
