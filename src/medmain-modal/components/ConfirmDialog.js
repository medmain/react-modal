import React from 'react';
import PropTypes from 'prop-types';

import Dialog from './Dialog';
import {getOkButton, getCancelButton} from './buttons';

const ConfirmDialog = ({
  okButton,
  cancelButton,
  onClose,
  okButtonTitle = 'OK',
  cancelButtonTitle = 'Cancel',
  ...otherProps
}) => {
  const mergedOkButton = getOkButton({okButtonTitle, okButton, onClose});
  const mergedCancelButton = getCancelButton({cancelButtonTitle, cancelButton, onClose});
  const buttons = [mergedOkButton, mergedCancelButton];
  return <Dialog {...otherProps} onClose={onClose} buttons={buttons} />;
};

ConfirmDialog.propTypes = {};

export default ConfirmDialog;
