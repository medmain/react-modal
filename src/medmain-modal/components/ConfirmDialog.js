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
  });
  const finalCancelButton = mergeButton({
    defaultButton: {
      title: cancelButtonTitle,
      value: false,
      isDefault: false
    },
    button: cancelButton,
    onClose
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

/*
Take a default "button" `{title, value, isDefault}`
related to a given type of modal (E.g. OK or Cancel button),
a button provided by the user {title, value or onClick, isDefault} and merge everything,
returning the button object to be used in the modal.
*/
function mergeButton({defaultButton, button, onClose}) {
  const merged = button
    ? {
        ...defaultButton,
        ...button
      }
    : defaultButton;
  // Default onClick handler: the modal will resolve with the `value` property of the button
  const defaultOnClick = () => {
    onClose(merged.value);
  };
  // When a custom onClick handler is provided, the user calls close passing a value.
  // the modal will resolve with the value provided
  const customOnClick = () => {
    button.onClick({
      close: value => {
        onClose(value);
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
