import React from 'react';
import PropTypes from 'prop-types';
import hostNameFromUrl from '../util/hostNameFromUrl';

const PostLink = (props) => {
  let url = props.url;
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    url = `http://${url}`;
  }

  return (
    <div className="post-link">
      <a className="post-title" href={`/post/${props.postId}`}>{props.title}</a>
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
