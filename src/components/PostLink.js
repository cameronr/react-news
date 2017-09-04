import React from 'react';
import PropTypes from 'prop-types';
import hostNameFromUrl from '../util/hostNameFromUrl';

class PostLink extends React.Component {
  // = ({ url, title }) => (

  render() {
    let url = this.props.url;
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      url = 'http://' + url;
    }

    return (
      <div className="post-link">
        <a className="post-title" href={ url }>{ this.props.title }</a>
        <span className="hostname">
          (<a href={ url }>{ hostNameFromUrl(url) }</a>)
        </span>
      </div>
    );
  }
}

PostLink.propTypes = {
  url: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired
};

export default PostLink;
