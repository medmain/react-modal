/*
For compatibility with the previous API,
a class that provides the following method:
- createElement
- confirm
*/
import React from 'react';

import {ModalConsumer} from './modal-context';
import SimpleDialog from './components/SimpleDialog';

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
        {({showModal}) => {
          // Attach the modal methods now that we have access to `showModal` function
          this.confirm = confirm({showModal, options: this.options});
        }}
      </ModalConsumer>
    );
  }
}

const confirm = ({showModal, options}) => (message, props = {}) => {
  const {okButtonTitle, cancelButtonTitle} = options;
  const {okButton} = props;
  return new Promise(resolve => {
    const onSelect = value => resolve(value);
    const defaultOkButton = {
      value: true,
      isDefault: true,
      title: propToString(okButtonTitle),
      onClick: () => onSelect(true)
    };
    const finalOkButton = {...defaultOkButton, ...okButton};
    const cancelButton = {
      value: false,
      default: false,
      title: propToString(cancelButtonTitle)
    };
    const buttons = [finalOkButton, cancelButton];
    return showModal(SimpleDialog, {message, buttons, ...props, onSelect});
  });
};

const propToString = prop => (typeof props === 'function' ? prop() : prop);

export default Modal;
