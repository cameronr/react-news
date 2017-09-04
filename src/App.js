import React from 'react';
import Reflux from 'reflux';
import { Switch, Route, Redirect } from 'react-router-dom';

import Actions from './actions/Actions';

import UserStore from './stores/UserStore';
import ModalStore from './stores/ModalStore';

import Posts from './views/Posts';
import SinglePost from './views/Single';
import Profile from './views/Profile';
import PageNotFound from './views/404';

import Header from './components/Header';
import PropsRoute from './components/PropsRoute';
import Modal from './components/Modal';
import Login from './components/Login';
import Register from './components/Register';
import NewPost from './components/NewPost';

import './scss/main.scss';

class App extends Reflux.Component {
  constructor(props) {
    super(props);
    this.stores = [UserStore, ModalStore];
  }

  hideModal = (e) => {
    if (e) { e.preventDefault(); }
    Actions.hideModal();
  }

  newPost = () => {
    if (this.state.isLoggedIn) {
      Actions.showModal('newpost');
    } else {
      Actions.showModal('login', 'LOGIN_REQUIRED');
    }
  }

  getModalComponent = () => {
    if (!this.state.modalType) {
      return null;
    }

    let modalInner = null;
    const modalProps = {
      user: this.state,
      errorMessage: this.state.modalErrorMessage,
    };

    switch (this.state.modalType) {
      case 'register':
        modalInner = <Register {...modalProps} />; break;
      case 'login':
        modalInner = <Login {...modalProps} />; break;
      case 'newpost':
        modalInner = <NewPost {...modalProps} />; break;
      default:
        break;
    }

    return (
      <Modal hideModal={this.hideModal}>
        { modalInner }
      </Modal>
    );
  }

  render() {
    // TODO: seems messy to just use App.state for the user object.
    // Look into nested state objects (immutability?)
    const user = this.state;

    // console.log(this.state);

    return (
      <div>
        <Header user={user} />
        <main id="content" className="container">
          <Switch>
            <PropsRoute name="posts" exact path="/posts/:pageNum" component={Posts} user={user} ignoreScrollBehavior />
            <PropsRoute name="post" exact path="/post/:postId" component={SinglePost} user={user} />
            <PropsRoute name="profile" exact path="/user/:username" component={Profile} user={user} />
            <Route name="404" exact path="/404" component={PageNotFound} />
            {/* Redirects */}
            <Redirect from="/" to="/posts/1" />
            <Redirect from="*" to="/404" />
          </Switch>
        </main>
        { this.getModalComponent() }
      </div>
    );
  }
}

export default App;
