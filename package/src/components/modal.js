import React from 'react';
import {RadiumStarter} from 'radium-starter';
import PropTypes from 'prop-types';
import ReactModal from 'react-modal';

import DialogButton from './dialog-button';

const Modal = ({children, onClose, ...props}) => {
  const onRequestClose = () => {
    // `onRequestClose()` is triggered when "Escape" key is pushed.
    // In this case, the `dialog()` method will resolve with the boolean `false`.
    return onClose(false);
  };
  return (
    <RadiumStarter>
      {(t, s) => (
        <ReactModal isOpen style={mergeStyles(t, s, props)} onRequestClose={onRequestClose}>
          {children}
        </ReactModal>
      )}
    </RadiumStarter>
  );
};

Modal.Title = ({children}) => {
  return (
    <RadiumStarter>
      {(t, s) => {
        return (
          <h3
            key="title"
            style={[
              s.regular,
              s.secondaryTextColor,
              s.minimumLineHeight,
              {marginTop: '-0.25rem', marginBottom: '1.5rem'}
            ]}
          >
            {children}
          </h3>
        );
      }}
    </RadiumStarter>
  );
};

Modal.Body = ({children}) => <div>{children}</div>;

Modal.Footer = ({children, ...otherProps}) => {
  return (
    <div
      key="buttons"
      style={{
        display: 'flex',
        flexDirection: 'row-reverse', // render buttons in the opposite order
        marginTop: '1.5rem'
      }}
      {...otherProps}
    >
      {children}
    </div>
  );
};

/*
Use to display the button action bar from a definition of "button" objects
*/
Modal.ActionBar = ({onClose, buttons}) =>
  buttons.map((props, i) => {
    const style = i > 0 ? {marginRight: '.75rem'} : {}; // add space between buttons
    return <DialogButton key={props.value} {...props} onClose={onClose} style={style} />;
  });

Modal.ActionBar.propTypes = {
  onClose: PropTypes.func.isRequired,
  buttons: PropTypes.array.isRequired
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
function mergeStyles(t, s, props = {}) {
  const {overlay, content} = props.style || {};
  const {width, maxHeight, position} = props;
  const defaultStyles = {
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
  const mergedStyle = {
    overlay: {...defaultStyles.overlay, ...overlay},
    content: {...defaultStyles.content, ...content}
  };
  return mergedStyle;
}

export default Modal;
