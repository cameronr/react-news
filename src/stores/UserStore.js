import Reflux from 'reflux';
import Actions from '../actions/Actions';
import { firebaseUrl } from '../util/constants';

import Firebase from 'firebase';
const baseRef = new Firebase(firebaseUrl);
const usersRef = baseRef.child('users');

const defaultUser = {
  uid: '',
  username: '',
  upvoted: null,
  submitted: null,
  isLoggedIn: false,
  md5hash: null,
  latestPost: null
};

// let currentUser = Object.assign({}, defaultUser);

class UserStore extends Reflux.Store {
  constructor() {
    super();
    this.setState(Object.assign({}, defaultUser));
    this.listenables = Actions

    // triggered by auth changes
    baseRef.onAuth((authData) => {
      if (!authData) {
        // user is logged out
        usersRef.off();
        this.logoutCompleted();
      } else {
        // user is logged in
        this.loginCompleted(authData.uid);
      }
    });
  }

  logout = () => {
    baseRef.unauth();
  }

  logoutCompleted = () => {
    // reset currentUser to default
    this.setState(Object.assign({}, defaultUser));
    // this.trigger(currentUser);
  }

  loginCompleted = (userId) => {
    // get username
    usersRef.child(userId).once('value', (profile) => {
      let {
        username,
        upvoted,
        submitted,
        md5hash
      } = profile.val();

      this.setState({
        uid: userId,
        username: username,
        upvoted: upvoted,
        submitted: submitted || null,
        md5hash: md5hash,
        isLoggedIn: true,
        latestPost: null
      });

      // watch upvotes
      usersRef.child(`${userId}/upvoted`).on('value', (upvoted) => {
        this.updateUpvoted(upvoted.val());
      });

      // watch submissions
      usersRef.child(`${userId}/submitted`).on('value', (submitted) => {
        let submittedVal = submitted.val();
        this.updateSubmitted(submittedVal ? Object.keys(submittedVal) : []);
      });
    });
  }

  updateLatestPost = (postId) => {
    this.setState({
      latestPost: postId
    });
  }

  updateUpvoted = (newUpvoted) => {
    this.setState({
      upvoted: newUpvoted
    });
  }

  updateSubmitted = (newSubmitted) => {
    this.setState({
      submitted: newSubmitted || null
    });
  }

  static getUserId(username) {
    // returns userId given username
    return new Promise((resolve) => {
      usersRef.orderByChild('username').equalTo(username).once('value', (user) => {
        let userId = Object.keys(user.val())[0];
        resolve(userId);
      });
    });
  }

  getDefaultData = () => {
    return this.state;
  }
}

export default UserStore;
