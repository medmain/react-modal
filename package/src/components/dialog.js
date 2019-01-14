import React from 'react';
import PropTypes from 'prop-types';
import {RadiumStarter, Button} from 'radium-starter';

export const Dialog = ({close, title, message, buttons}) => (
  <div>
    {title && <DialogTitle>{title}</DialogTitle>}
    <DialogBody>
      <div>{message}</div>
    </DialogBody>
    {buttons && (
      <DialogFooter>
        <DialogActionBar onClose={close} buttons={buttons} />
      </DialogFooter>
    )}
  </div>
);
Dialog.propTypes = {
  close: PropTypes.func.isRequired,
  title: PropTypes.string,
  buttons: PropTypes.array,
  message: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired
};

const DialogTitle = ({children}) => {
  return (
    <RadiumStarter>
      {(t, s) => {
        return (
          <h3
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
DialogTitle.propTypes = {
  children: PropTypes.node
};

const DialogBody = ({children}) => <div style={{whiteSpace: 'pre-line'}}>{children}</div>;
DialogBody.propTypes = {
  children: PropTypes.node
};

const DialogFooter = ({children, ...otherProps}) => {
  return (
    <div
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
DialogFooter.propTypes = {
  children: PropTypes.node
};

/*
Render an action button inside the modal footer.
Provide:
- either a value that will be passed to `onClose` event handler when the button is clicked
- OR a custom `onClick` handler, calling by yourself the `close` argument of the handler
See storybook example to see the 2 patterns in action!
*/
const DialogButton = ({onClose, value, title, onClick, isDefault, style}) => {
  // Default onClick handler: the modal will resolve with the `value` property of the button
  let actualOnClose = () => onClose(value);
  // When a custom `onClick` handler is provided, the user calls close passing a value.
  // the modal will resolve with the provider value
  if (onClick) {
    actualOnClose = () => {
      onClick({onClose: close});
    };
  }
  return (
    <Button
      onClick={actualOnClose}
      style={style}
      rsPrimary={isDefault}
      autoFocus={isDefault /* to let user validate with Enter key */}
    >
      {renderText(title)}
    </Button>
  );
};
DialogButton.propTypes = {
  onClose: PropTypes.func.isRequired,
  value: PropTypes.any,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,
  onClick: PropTypes.func,
  isDefault: PropTypes.bool,
  style: PropTypes.object
};

/*
Render either a String or a function that returns JSX code (part of the current API)
*/
const renderText = text => (typeof text === 'function' ? text() : text);

/*
Use to display the button action bar from a definition of "button" objects
*/
const DialogActionBar = ({onClose, buttons}) =>
  buttons.map((props, i) => {
    const style = i > 0 ? {marginRight: '.75rem'} : {}; // add space between buttons
    return <DialogButton key={props.value} {...props} onClose={onClose} style={style} />;
  });
DialogActionBar.propTypes = {
  onClose: PropTypes.func.isRequired,
  buttons: PropTypes.array.isRequired
};
