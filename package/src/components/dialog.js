import React from 'react';
import PropTypes from 'prop-types';
import {RadiumStarter} from 'radium-starter';

import Message from './message';
import DialogButton from './dialog-button';

export const Dialog = ({close, title, message, buttons}) => (
  <div>
    {title && <Dialog.Title>{title}</Dialog.Title>}
    <Dialog.Body>
      <Message text={message} />
    </Dialog.Body>
    {buttons && (
      <Dialog.Footer>
        <Dialog.ActionBar onClose={close} buttons={buttons} />
      </Dialog.Footer>
    )}
  </div>
);

Dialog.propTypes = {
  close: PropTypes.func.isRequired,
  title: PropTypes.string,
  buttons: PropTypes.array,
  message: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired
};

Dialog.Title = ({children}) => {
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
Dialog.Title.propTypes = {
  children: PropTypes.node
};

Dialog.Body = ({children}) => <div>{children}</div>;
Dialog.Body.propTypes = {
  children: PropTypes.node
};

Dialog.Footer = ({children, ...otherProps}) => {
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
Dialog.Footer.propTypes = {
  children: PropTypes.node
};

/*
Use to display the button action bar from a definition of "button" objects
*/
Dialog.ActionBar = ({onClose, buttons}) =>
  buttons.map((props, i) => {
    const style = i > 0 ? {marginRight: '.75rem'} : {}; // add space between buttons
    return <DialogButton key={props.value} {...props} onClose={onClose} style={style} />;
  });
Dialog.ActionBar.propTypes = {
  onClose: PropTypes.func.isRequired,
  buttons: PropTypes.array.isRequired
};
