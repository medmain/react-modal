import React from 'react';
import {RadiumStarter, Button} from 'radium-starter';
import PropTypes from 'prop-types';

import './modal.css';
import DialogButton from './DialogButton';

const Context = React.createContext();

// do we need to access `onRequestClose` from Dialog.Header?

class Dialog extends React.Component {
  render() {
    const {children, onClose, style, ...otherProps} = this.props;
    return children;
    return (
      <RadiumStarter>
        {(t, s) => <Context.Provider value={otherProps}>{children}</Context.Provider>}
      </RadiumStarter>
    );
  }
}

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

Dialog.Body = ({children}) => <div>{children}</div>;

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

Dialog.ActionBar = ({onClose, buttons}) =>
  buttons.map((props, i) => {
    const style = i > 0 ? {marginRight: '.75rem'} : {}; // add space between buttons
    return <DialogButton key={props.value} {...props} onClose={onClose} style={style} />;
  });

Dialog.propTypes = {};

export default Dialog;
