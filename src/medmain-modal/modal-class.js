/*
For compatibility with the existing API,
a class that provides the following method:
- createElement
- confirm
- alert
- dialog
*/
import React from 'react';

import {ModalProvider, ModalConsumer} from './modal-context';
import {Confirm, Alert, Dialog} from './components';

class Modal {
  constructor({okButtonTitle, cancelButtonTitle} = {}) {
    this.options = {
      okButtonTitle,
      cancelButtonTitle
    };
  }
  createElement() {
    return (
      <ModalProvider>
        <ModalConsumer>
          {({showModal /*hideModal*/}) => {
            // Attach the modal methods now that we have access to `showModal` function
            this.alert = showComponent({
              Component: withProps({okButtonTitle: this.okButtonTitle})(Alert),
              showModal
            });
            this.confirm = showComponent({
              Component: Confirm,
              showModal
            });
            this.dialog = showDialog({
              showModal
            });
          }}
        </ModalConsumer>
      </ModalProvider>
    );
  }
}

const withProps = extraProps => Wrapped => props => Wrapped({...props, ...extraProps});

const showComponent = ({Component, showModal}) => (message, props = {}) => {
  const style = setModalStyle(props);
  console.log({style});

  return new Promise(resolve => {
    return showModal(Component, {message, style, ...props, onClose: value => resolve(value)});
  });
};
const showDialog = ({showModal}) => (props = {}) => {
  const style = setModalStyle(props);
  return new Promise(resolve => {
    return showModal(Dialog, {style, ...props, onClose: value => resolve(value)});
  });
};

/*
Convert some optional attributes related to the styling (width, padding...)
into the style props applied to ReactModal
*/
const setModalStyle = props => {
  const contentProps = ['width', 'padding'];
  const reducer = (acc, val) => (props[val] ? {...acc, [val]: props[val]} : acc);
  const content = contentProps.reduce(reducer, {});
  return {content};
};

export default Modal;
