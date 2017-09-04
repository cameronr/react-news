import Reflux from 'reflux';
import Actions from '../actions/Actions';
import getErrorMessage from '../util/getErrorMessage';

let commentFormData = {
  errorMessage: ''
};

class CommentFormStore extends Reflux.Store {

  constructor(props) {
    super(props);
    this.listenables = Actions;
  }

  commentFormError = (errorCode) => {
    commentFormData.errorMessage = getErrorMessage(errorCode);
    this.trigger(commentFormData);
  }

  clearCommentFormError = () => {
    commentFormData.errorMessage = '';
    this.trigger(commentFormData);
  }

  static getDefaultData() {
    return commentFormData;
  }

}

export default CommentFormStore;
