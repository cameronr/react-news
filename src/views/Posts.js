import React from 'react';
import Reflux from 'reflux';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import {
  DropdownButton,
  ListGroup,
  ListGroupItem,
  MenuItem,
} from 'react-bootstrap';

import Actions from '../actions/Actions';
import PostsStore from '../stores/PostsStore';

import Spinner from '../components/Spinner';
import Post from '../components/Post';


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
      currentPage: postsData.currentPage,
    };
    this.stores = [PostsStore];
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

  onSelectSortBy = (sortByValue) => {
    const { sortOptions } = this.state;
    const currentPage = this.state.currentPage || 1;

    // optimistically update selected option
    sortOptions.currentValue = sortByValue;

    this.setState({
      sortOptions,
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
    const { loading, nextPage, posts, sortOptions } = this.state;
    const { user } = this.props;
    const currentPage = this.state.currentPage || 1;

    // possible sort values (defined in PostsStore)
    const sortValues = Object.keys(sortOptions.values);
    const options = sortValues.map((optionText, i) => (
      <MenuItem key={sortValues[i]} eventKey={sortValues[i]}>{optionText} </MenuItem>
    ));

    const postItems = posts.length ?
      posts.map(post => (
        <ListGroupItem key={post.id}><Post post={post} user={user} /></ListGroupItem>
      ))
      :
      'There are no posts yet!';

    return (
      // http://jsfiddle.net/b2m38br9/1/
      <div className="panel panel-default posts">
        <div className="panel-heading">
          <h3 className="panel-title pull-left">
            Posts
          </h3>
          <div className="pull-right">
            <DropdownButton
              id="sort-by"
              title="Sort by"
              bsSize="small"
              onSelect={this.onSelectSortBy}
            >
              {options}
            </DropdownButton>
          </div>
          <div className="clearfix" />
        </div>
        <ListGroup fill>
          { loading ? <Spinner /> : postItems }
        </ListGroup>
        <div className="panel-footer">
          { nextPage ? (
            <Link to={`/posts/${currentPage + 1}`}>
              Load More Posts
            </Link>
          ) : 'No More Posts'
          }
        </div>
      </div>
    );
  }
}

Posts.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    uid: PropTypes.string.isRequired,
    isLoggedIn: PropTypes.bool.isRequired,
    md5hash: PropTypes.string.optional,
  }).isRequired,
};

export default withRouter(Posts);
