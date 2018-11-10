/*
For compatibility with the previous API,
a class that provides the following method:
- createElement
- confirm
*/
import React from 'react';

import {ModalConsumer} from './modal-context';
import {ConfirmDialog} from './components';

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
        {({showModal, hideModal}) => {
          // Attach the modal methods now that we have access to `showModal` function
          this.confirm = confirm({showModal, hideModal, options: this.options});
        }}
      </ModalConsumer>
    );
  }
}

const confirm = ({showModal, hideModal, options}) => (message, props = {}) => {
  return new Promise(resolve => {
    return showModal(ConfirmDialog, {message, ...props, onClose: value => resolve(value)});
  });
};

// const propToString = prop => (typeof props === 'function' ? prop() : prop);

export default Modal;
