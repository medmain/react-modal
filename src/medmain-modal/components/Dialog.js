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

Dialog.Body = ({children}) => <div>{children}</div>;

Dialog.Footer = ({children, ...otherProps}) => {
  return <div {...otherProps}>{children}</div>;
};

Dialog.ActionBar = ({buttons}) => (
  <div
    key="buttons"
    style={{
      display: 'flex',
      flexDirection: 'row-reverse',
      marginTop: '1.5rem'
    }}
  >
    {buttons.map(({title, value, isDefault, onClick}, i) => {
      const style = i > 0 ? {marginRight: '.75rem'} : {};
      // Buttons will be rendered in the opposite order because of CSS
      return (
        <Dialog.Button
          key={value}
          onClick={onClick}
          style={style}
          rsPrimary={isDefault}
          autoFocus={isDefault /* to let user validate with Enter key */}
        >
          {title}
        </Dialog.Button>
      );
    })}
  </div>
);

Dialog.Button = ({children, ...otherProps}) => {
  return <Button {...otherProps}>{children}</Button>;
};

Dialog.propTypes = {};

export default Dialog;
