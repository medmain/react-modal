import React from 'react';
import ReactModal from 'react-modal';
import {RadiumStarter, Button} from 'radium-starter';
import PropTypes from 'prop-types';

const Dialog = ({children, ...otherProps}) => {
  return (
    <ReactModal isOpen {...otherProps}>
      {children}
    </ReactModal>
  );
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

Dialog.Body = ({children}) => <div>{children}</div>;

Dialog.Footer = ({buttons, onRequestClose, onSelect}) => {
  const defaultHandleClick = value => () => {
    onRequestClose();
    onSelect(value);
  };
  return (
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
        const handleClick = onClick
          ? () => {
              // debugger;
              onClick({close: onRequestClose});
            }
          : defaultHandleClick(value);
        return (
          <Dialog.Button key={value} onClick={handleClick} style={style} rsPrimary={isDefault}>
            {title}
          </Dialog.Button>
        );
      })}
    </div>
  );
};

Dialog.Button = ({children, ...otherProps}) => {
  return <Button {...otherProps}>{children}</Button>;
};

Dialog.propTypes = {};

export default Dialog;
