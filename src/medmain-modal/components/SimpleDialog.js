import React from 'react';
import PropTypes from 'prop-types';
import Dialog from './Dialog';

const SimpleDialog = ({title, message, buttons, onSelect, onRequestClose, ...otherProps}) => {
  return (
    <Dialog onRequestClose={onRequestClose} {...otherProps}>
      <Dialog.Title>{title}</Dialog.Title>
      <Dialog.Body>{message}</Dialog.Body>
      <Dialog.Footer buttons={buttons} onRequestClose={onRequestClose} onSelect={onSelect} />
    </Dialog>
  );
};

SimpleDialog.propTypes = {};

export default SimpleDialog;
