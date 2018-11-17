/*
For compatibility with the existing API,
a class that provides the following method:
- createElement
- confirm
- alert
- dialog
*/
import React from 'react';

import {ModalConsumer} from './modal-context';
import {ConfirmDialog, Alert, Dialog} from './components';

const OK_BUTTON_TITLE = 'OK';
const CANCEL_BUTTON_TITLE = 'Cancel';

class Modal {
  constructor({okButtonTitle = OK_BUTTON_TITLE, cancelButtonTitle = CANCEL_BUTTON_TITLE} = {}) {
    this.options = {
      okButtonTitle,
      cancelButtonTitle
    };
  }
  createElement() {
    return (
      <ModalConsumer>
        {({showModal /*hideModal*/}) => {
          // Attach the modal methods now that we have access to `showModal` function
          this.alert = showComponent({
            Component: Alert,
            showModal
          });
          this.confirm = showComponent({
            Component: ConfirmDialog,
            showModal
          });
          this.dialog = showDialog({
            showModal
          });
        }}
      </ModalConsumer>
    );
  }
}

const showComponent = ({Component, showModal}) => (message, props = {}) => {
  const style = setModalStyle(props);
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
Convert style properties (width, padding...) into the style object applied to ReactModal
*/
const setModalStyle = props => {
  const {width} = props;
  const style = width ? {content: {width}} : {};
  return style;
};

export default Modal;
