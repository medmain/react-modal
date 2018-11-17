import React from 'react';
import PropTypes from 'prop-types';

import Dialog from './Dialog';
import {getOkButton} from './buttons';

const Alert = ({okButton, cancelButton, onClose, okButtonTitle = 'OK', ...otherProps}) => {
  const mergedOkButton = getOkButton({okButtonTitle, okButton, onClose});
  const buttons = [mergedOkButton];
  return <Dialog {...otherProps} onClose={onClose} buttons={buttons} />;
};

export default Alert;