import React from 'react';
import PropTypes from 'prop-types';

/*
Render either a DOM node or raw HTML if the argument is an object with the `__html` property
*/
const Message = ({text}) => {
  const isRawHtml = Object.prototype.hasOwnProperty.call(text, '__html');
  return isRawHtml ? (
    <div key="message" dangerouslySetInnerHTML={text} />
  ) : (
    <div key="message" style={{whiteSpace: 'pre-line'}}>
      {text}
    </div>
  );
};

Message.propTypes = {};

export default Message;
