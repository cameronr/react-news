import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import Actions from '../actions/Actions';
import abbreviateNumber from '../util/abbreviateNumber';

class Upvote extends React.Component {
  constructor(props) {
    super(props);
    // TODO: maybe this shouldn't have state at all?
    this.state = {
      updating: false,
      upvoted: this.props.isUpvoted,
    };
  }

  componentWillReceiveProps(nextProps) {
    const oldUpvoted = this.props.isUpvoted;
    const newUpvoted = nextProps.isUpvoted;

    // don't update unless upvoted changes
    if (oldUpvoted === newUpvoted) {
      return;
    }

    this.setState({
      updating: false,
      upvoted: nextProps.isUpvoted,
    });
  }

  upvote = () => {
    const { upvoted, updating } = this.state;
    const { user, itemId, upvoteActions } = this.props;

    if (updating) {
      return;
    }

    if (!user.isLoggedIn) {
      Actions.showModal('login', 'LOGIN_REQUIRED');
      return;
    }

    const upvoteAction = upvoted
      ? upvoteActions.downvote
      : upvoteActions.upvote;

    this.setState({
      upvoted: !upvoted,
      // wait for action to complete before allowing upvote
      updating: true,
    });

    upvoteAction(user.uid, itemId);
  }

  render() {
    const { upvoted, updating } = this.state;
    const { upvotes } = this.props;

    const upvoteCx = cx('upvote', {
      upvoted,
      updating,
    });

    return (
      <a className={upvoteCx} onClick={this.upvote} role="button">
        <span>{ abbreviateNumber(upvotes) }</span>
        <img src={require('../svg/upvote.svg')} alt="Upvote" />
      </a>
    );
  }
}

Upvote.propTypes = {
  isUpvoted: PropTypes.bool.isRequired,
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    uid: PropTypes.string.isRequired,
    isLoggedIn: PropTypes.bool.isRequired,
    md5hash: PropTypes.string.optional,
  }).isRequired,
  itemId: PropTypes.string.isRequired,
  upvoteActions: PropTypes.shape({
    upvote: PropTypes.func.isRequired,
    downvote: PropTypes.func.isRequired,
  }).isRequired,
  upvotes: PropTypes.number.isRequired,
};

export default Upvote;
