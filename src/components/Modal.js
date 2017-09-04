import React from 'react';
import PropTypes from 'prop-types';

class Modal extends React.Component {

  componentDidMount() {
    // allow esc to close modal
    document.addEventListener('keyup', this.onKeyUp);
  }

  componentWillUnmount() {
    document.removeEventListener('keyup', this.onKeyUp);
  }

  onKeyUp = (e) => {
    // esc key closes modal
    if (e.keyCode === 27) {
      this.props.hideModal();
    }
  }

  render() {
    const { hideModal, children } = this.props;

    return (
      <div className="modal-overlay" onClick={ hideModal }>
        <div className="modal-inner" onClick={ (e) => e.stopPropagation() }>
          <a href="#hideModal" onClick={ hideModal } className="modal-close">
            <img src={ require('../svg/close.svg') } alt="" />
            <span className="sr-only">Hide Modal</span>
          </a>
          { children }
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  hideModal: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.element
  ]).isRequired
}

Modal.defaultProps = {
  hideModal: () => {},
  children: null
}

export default Modal;
