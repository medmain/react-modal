import React from 'react';
import PropTypes from 'prop-types';
import Dialog from './Dialog';

const ConfirmDialog = ({
  title,
  message,
  okButton,
  cancelButton,
  onClose,
  okButtonTitle = 'OK',
  cancelButtonTitle = 'Cancel',
  ...otherProps
}) => {
  const finalOkButton = mergeButton({
    defaultButton: {
      title: okButtonTitle,
      value: true,
      isDefault: true
    },
    button: okButton,
    onClose
    // hideModal
  });
  const finalCancelButton = mergeButton({
    defaultButton: {
      title: cancelButtonTitle,
      value: false,
      isDefault: false
    },
    button: cancelButton,
    onClose
    // hideModal
  });
  const buttons = [finalOkButton, finalCancelButton];
  return (
    <Dialog onClose={onClose} {...otherProps}>
      <Dialog.Title>{title}</Dialog.Title>
      <Dialog.Body>{message}</Dialog.Body>
      <Dialog.Footer>
        <Dialog.ActionBar buttons={buttons} />
      </Dialog.Footer>
    </Dialog>
  );
};

function mergeButton({defaultButton, button, onClose, hideModal}) {
  const merged = button
    ? {
        ...defaultButton,
        ...button
      }
    : defaultButton;
  const defaultOnClick = () => {
    onClose(merged.value);
    // hideModal();
  };
  const customOnClick = x => {
    button.onClick({
      close: () => {
        // hideModal();
        onClose(merged.value);
      }
    });
  };
  const onClick = button && button.onClick ? customOnClick : defaultOnClick;
  return {
    ...merged,
    onClick
  };
}

ConfirmDialog.propTypes = {};

export default ConfirmDialog;
