import React from 'react';
import Reflux from 'reflux';
import Actions from '../actions/Actions';
import { withRouter } from "react-router-dom";
import PropTypes from 'prop-types';

import PostsStore from '../stores/PostsStore';

import Spinner from '../components/Spinner';
import Post from '../components/Post';
import { Link } from 'react-router-dom';

class Posts extends Reflux.Component {

  constructor(props) {
    super(props);

    // TODO: Messy to have to pull the state out here. Could be cleaner to
    // support having no state set?
    const postsData = PostsStore.getDefaultData();
    this.state = {
      loading: postsData.loading,
      posts: postsData.posts,
      sortOptions: postsData.sortOptions,
      nextPage: postsData.nextPage,
      currentPage: postsData.currentPage
    };
    this.stores = [PostsStore]
  }

  componentDidMount() {
    const { pageNum } = this.props.match.params;

    if (isNaN(pageNum) || pageNum < 1) {
      this.props.history.push('/404');
      return;
    }

    Actions.watchPosts(pageNum);
  }

  componentWillReceiveProps(nextProps) {
    const { pageNum } = nextProps.match.params;

    if (isNaN(pageNum) || pageNum < 1) {
      this.props.history.push('/404');
      return;
    }

    Actions.stopWatchingPosts();
    Actions.watchPosts(pageNum);
  }

  componentWillUnmount() {
    super.componentWillUnmount();
    Actions.stopWatchingPosts();
  }

  updateSortBy = (e) => {
    e.preventDefault();
    const { sortOptions } = this.state;
    const currentPage = this.state.currentPage || 1;
    const sortByValue = e.target.value;

    // optimistically update selected option
    sortOptions.currentValue = sortByValue;

    this.setState({
      sortOptions: sortOptions
    });

    Actions.setSortBy(sortByValue);

    if (currentPage !== 1) {
      this.props.history.push('/posts/1');
    } else {
      Actions.stopWatchingPosts();
      Actions.watchPosts(currentPage);
    }
  }

  render() {
    // TODO: break into components: sortDropDown, postsList, nav component
    const { loading, nextPage, posts, sortOptions } = this.state;
    const { user } = this.props;
    const currentPage = this.state.currentPage || 1;

    // possible sort values (defined in PostsStore)
    const sortValues = Object.keys(sortOptions.values);

    const options = sortValues.map((optionText, i) => (
      <option value={ sortOptions[i] } key={ i }>{ optionText }</option>
    ));

    const postEls = posts.length
      ? posts.map((post) => (
        <Post post={ post } user={ user } key={ post.id } />)
      )
      : 'There are no posts yet!';

    return (
      <div className="content full-width">
        <label htmlFor="sortby-select" className="sortby-label">Sort by </label>
        <div className="sortby">
          <select
            id="sortby-select"
            className="sortby-select"
            onChange={ this.updateSortBy }
            value={ sortOptions.currentValue }
            ref="sortBy"
          >
            { options }
          </select>
        </div>
        <hr />
        <div className="posts">
          { loading ? <Spinner /> : postEls }
        </div>
        <hr />
        <nav className="pagination">
          {
            nextPage ? (
              <Link to={ `/posts/${currentPage + 1}` } className="next-page">
                Load More Posts
              </Link>
            ) : 'No More Posts'
          }
        </nav>
      </div>
    );
  }
}

Posts.propTypes = {
  params: PropTypes.object,
  user: PropTypes.object.isRequired
}

export default withRouter(Posts);
