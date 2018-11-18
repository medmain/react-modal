import React from 'react';
import {RadiumStarter} from 'radium-starter';
import PropTypes from 'prop-types';

import './modal.css';
import DialogButton from './DialogButton';

const Modal = ({children}) => children;

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

Modal.propTypes = {};

export default Modal;
