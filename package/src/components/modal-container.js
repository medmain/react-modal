import React from 'react';
import {RadiumStarter} from 'radium-starter';
import PropTypes from 'prop-types';
import ReactModal from 'react-modal';

const ModalContainer = ({onClose, children, ...props}) => {
  return (
    <RadiumStarter>
      {(t, s) => (
        <ReactModal
          isOpen
          style={generateStyle(t, s, props)}
          onRequestClose={onClose}
          ariaHideApp={false}
        >
          {children}
        </ReactModal>
      )}
    </RadiumStarter>
  );
};
ModalContainer.propTypes = {
  onClose: PropTypes.func,
  children: PropTypes.node
};

/*
Given the theme provided by Radium Starter,
return the style object to be applied to the `<ReactModal>` component
The object has 2 properties:
* overlay
* content
Reference:
http://reactcommunity.org/react-modal/styles/
*/
function generateStyle(t, s, props = {}) {
  const {width, maxHeight, position} = props;
  const style = {
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.66)'
    },
    content: {
      width: width || 500,
      maxHeight,
      margin: '0 auto',
      bottom: position === 'center' ? 40 : 'auto',
      backgroundColor: t.backgroundColor,
      display: 'flex',
      flexDirection: 'column',
      ...s.border,
      ...s.rounded
    }
  };
  return style;
}

export default ModalContainer;
