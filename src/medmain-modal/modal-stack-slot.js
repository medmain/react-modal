import React from 'react';
import ReactModal from 'react-modal';

import getStyle from './components/style';

const Slot = ({component: Component, isOpen, t, s, hideModal, style, ...props}) => {
  const {onClose} = props;
  const mergedOnClose = value => {
    hideModal();
    onClose(value);
  };
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={() => mergedOnClose(false)}
      style={getStyle(t, s, style)}
    >
      <Component {...props} onClose={mergedOnClose} style={style} />
    </ReactModal>
  );
};

export default Slot;
