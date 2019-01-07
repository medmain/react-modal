const OK_BUTTON_TITLE = 'OK';
const CANCEL_BUTTON_TITLE = 'Cancel';

export function getOkButton({okButtonTitle = OK_BUTTON_TITLE, okButton, onClose}) {
  return mergeButton({
    defaultButton: {
      title: okButtonTitle,
      value: true,
      isDefault: true
    },
    button: okButton,
    onClose
  });
}

export function getCancelButton({cancelButtonTitle = CANCEL_BUTTON_TITLE, cancelButton, onClose}) {
  return mergeButton({
    defaultButton: {
      title: cancelButtonTitle,
      value: false,
      isDefault: false
    },
    button: cancelButton,
    onClose
  });
}


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
