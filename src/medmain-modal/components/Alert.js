import React from 'react';

import Dialog from './Dialog';
import {getOkButton} from './buttons';

const Alert = ({okButton, onClose, okButtonTitle, ...otherProps}) => {
  const mergedOkButton = getOkButton({okButtonTitle, okButton, onClose});
  const buttons = [mergedOkButton];
  return <Dialog {...otherProps} onClose={onClose} buttons={buttons} />;
};

export default Alert;
