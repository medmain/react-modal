import React from 'react';
import PropTypes from 'prop-types';
import {Button} from 'radium-starter';

/*
Render an action button inside the modal footer.
Provide:
- either a value that will be passed to `onClose` event handler when the button is clicked
- OR a custom `onClick` handler, calling by yourself the `close` argument of the handler
See storybook example to see the 2 patterns in action!
*/
const DialogButton = ({onClose, value, title, onClick, isDefault, style}) => {
  // Default onClick handler: the modal will resolve with the `value` property of the button
  const defaultOnClick = () => {
    onClose(value);
  };
  // When a custom onClick handler is provided, the user calls close passing a value.
  // the modal will resolve with the value provided
  const customOnClick = () => {
    onClick({
      close: value => {
        onClose(value);
      }
    });
  };
  const mergedOnClick = onClick ? customOnClick : defaultOnClick;
  return (
    <Button
      key={value}
      onClick={mergedOnClick}
      style={style}
      rsPrimary={isDefault}
      autoFocus={isDefault /* to let user validate with Enter key */}
    >
      {renderText(title)}
    </Button>
  );
};

/*
Render either a String or a function that returns JSX code (part of the current API)
*/
const renderText = text => (typeof text === 'function' ? text() : text);

DialogButton.propTypes = {
  onClose: PropTypes.func.isRequired,
  onClick: PropTypes.func,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired
};

export default DialogButton;
