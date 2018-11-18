import React from 'react';
import PropTypes from 'prop-types';

import Modal from './Modal';
import Message from './Message';

const Dialog = ({onClose, message, title, buttons, ...otherProps}) => {
  return (
    <Modal onClose={onClose} {...otherProps}>
      {title && <Modal.Title>{title}</Modal.Title>}
      <Modal.Body>
        <Message text={message} />
      </Modal.Body>
      {buttons && (
        <Modal.Footer>
          <Modal.ActionBar onClose={onClose} buttons={buttons} />
        </Modal.Footer>
      )}
    </Modal>
  );
};

Dialog.propTypes = {
  text: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
  onClose: PropTypes.func.isRequired
};

export default Dialog;
