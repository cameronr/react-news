import Reflux from 'reflux';
import Actions from '../actions/Actions';
import getErrorMessage from '../util/getErrorMessage';

let modalState = {
    type: false,
    errorMessage: ''
};

const ModalStore = Reflux.createStore({

    listenables: Actions,

    showModal(type, errorCode) {
        modalState = {
            modalType: type,
            modalErrorMessage: errorCode ? getErrorMessage(errorCode) : ''
        };

        this.trigger(modalState);
    },

    hideModal() {
        modalState.modalType = false;
        this.trigger(modalState);
    },

    modalError(errorCode) {
        modalState.modalErrorMessage = getErrorMessage(errorCode);
        this.trigger(modalState);
    },

    getDefaultData() {
        return modalState;
    }

});

export default ModalStore;
