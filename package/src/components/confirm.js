import React from 'react';

import Dialog from './dialog';
import {getOkButton, getCancelButton} from './ok-cancel-button-helpers';

const Confirm = ({
  okButton,
  cancelButton,
  onClose,
  okButtonTitle,
  cancelButtonTitle,
  ...otherProps
}) => {
  const buttons = [
    getOkButton({okButtonTitle, okButton, onClose}),
    getCancelButton({cancelButtonTitle, cancelButton, onClose})
  ];
  return <Dialog {...otherProps} onClose={onClose} buttons={buttons} />;
};

export default Confirm;
