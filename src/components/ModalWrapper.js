import React from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'react-bootstrap';

const ModalWrapper = (props) => {
  const { children, title, onHide } = props;
  return (
    <Modal show={!!children} onHide={onHide}>
      <Modal.Header closeButton>
        { title ? <Modal.Title>{title}</Modal.Title> : ''}
      </Modal.Header>
      { children }
    </Modal>
  );
};

ModalWrapper.propTypes = {
  onHide: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.element,
  ]).isRequired,
  title: PropTypes.string,
};

ModalWrapper.defaultProps = {
  title: null,
};

export default ModalWrapper;
