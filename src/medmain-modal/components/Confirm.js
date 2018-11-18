import React from 'react';
import PropTypes from 'prop-types';

import Dialog from './Dialog';
import {getOkButton, getCancelButton} from './buttons';

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

Confirm.propTypes = {};

export default Confirm;
