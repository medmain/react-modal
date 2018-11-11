import React from 'react';
import ReactModal from 'react-modal';
import {RadiumStarter, Button} from 'radium-starter';
import PropTypes from 'prop-types';

// const Dialog = ({children, ...otherProps}) => {
//   return (
//     <ReactModal isOpen {...otherProps}>
//       {children}
//     </ReactModal>
//   );
// };

const Context = React.createContext();

// do we need to access `onRequestClose` from Dialog.Header?

class Dialog extends React.Component {
  static Title = ({children}) => {
    return (
      <Context.Consumer>
        {({onRequestClose}) => (
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
        )}
      </Context.Consumer>
    );
  };
  render() {
    const {children, onClose, ...otherProps} = this.props;
    return (
      <Context.Provider value={otherProps}>
        <ReactModal isOpen {...otherProps} onRequestClose={() => onClose(false)}>
          {children}
        </ReactModal>
      </Context.Provider>
    );
  }
}

Dialog.Body = ({children}) => <div>{renderMessage(children)}</div>;

Dialog.Footer = ({children, ...otherProps}) => {
  return <div {...otherProps}>{children}</div>;
};

Dialog.ActionBar = ({buttons}) => (
  <div
    key="buttons"
    style={{
      display: 'flex',
      flexDirection: 'row-reverse', // render buttons in the opposite order
      marginTop: '1.5rem'
    }}
  >
    {buttons.map(({title, value, isDefault, onClick}, i) => {
      const style = i > 0 ? {marginRight: '.75rem'} : {}; // add space between buttons
      return (
        <Dialog.Button
          key={value}
          onClick={onClick}
          style={style}
          rsPrimary={isDefault}
          autoFocus={isDefault /* to let user validate with Enter key */}
        >
          {renderText(title)}
        </Dialog.Button>
      );
    })}
  </div>
);

/*
Render either a String or a function that returns JSX code
*/
const renderText = text => (typeof text === 'function' ? text() : text);

/*
Render either a DOM node or raw HTML if the argument is an object with the `__html` property
*/
const renderMessage = message => {
  const isRawHtml = Object.prototype.hasOwnProperty.call(message, '__html');
  return isRawHtml ? (
    <div key="message" dangerouslySetInnerHTML={message} />
  ) : (
    <div key="message" style={{whiteSpace: 'pre-line'}}>
      {message}
    </div>
  );
};

Dialog.Button = ({children, ...otherProps}) => {
  return <Button {...otherProps}>{children}</Button>;
};

Dialog.propTypes = {};

export default Dialog;
