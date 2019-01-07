import React from 'react';

import Dialog from './dialog';
import {getOkButton} from './ok-cancel-button-helpers';

const Alert = ({okButton, onClose, okButtonTitle, ...otherProps}) => {
  const mergedOkButton = getOkButton({okButtonTitle, okButton, onClose});
  const buttons = [mergedOkButton];
  return <Dialog {...otherProps} onClose={onClose} buttons={buttons} />;
};

export default Alert;
