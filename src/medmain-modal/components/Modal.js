import React from 'react';
import {RadiumStarter} from 'radium-starter';
import PropTypes from 'prop-types';
import ReactModal from 'react-modal';

import './modal.css';
import DialogButton from './DialogButton';
import getStyle from './style';

const Modal = ({children, style, onClose}) => {
  const onRequestClose = () => {
    // `onRequestClose()` is triggered when "Escape" key is pushed.
    // In this case, the `dialog()` method will resolve with the boolean `false`.
    return onClose(false);
  };
  return (
    <RadiumStarter>
      {(t, s) => (
        <ReactModal isOpen style={getStyle(t, s, style)} onRequestClose={onRequestClose}>
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

export default Modal;
