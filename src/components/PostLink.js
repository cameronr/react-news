import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import hostNameFromUrl from '../util/hostNameFromUrl';

const PostLink = (props) => {
  let url = props.url;
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    url = `http://${url}`;
  }

  return (
    <div className="post-link">
      <Link className="post-title" to={`/post/${props.postId}`}>{props.title}</Link>
      <span className="hostname">
        (<a href={url}>{hostNameFromUrl(url)}</a>)
      </span>
    </div>
  );
};

PostLink.propTypes = {
  postId: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default PostLink;
