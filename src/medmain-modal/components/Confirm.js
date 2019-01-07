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
  const mergedOkButton = getOkButton({okButtonTitle, okButton, onClose});
  const mergedCancelButton = getCancelButton({cancelButtonTitle, cancelButton, onClose});
  const buttons = [mergedOkButton, mergedCancelButton];
  return <Dialog {...otherProps} onClose={onClose} buttons={buttons} />;
};

export default Confirm;
