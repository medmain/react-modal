import React from 'react';
import ReactModal from 'react-modal';

import getStyle from './components/style';

/*
To be able to show CSS transition effects when ReactModal components are displayed, 
we need to first render them with `isOpen` props set to false
Later, when we show a modal, we assign a `component` to be displayed inside the Modal 
and we set `isOpen` props to true.
 */
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
