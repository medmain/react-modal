import React from 'react';
import Base from '@ministate/base';
import subscribe from '@ministate/react';

import {Stack} from './components/stack';

const OK_BUTTON_TITLE = 'OK';
const CANCEL_BUTTON_TITLE = 'Cancel';

export class Modal extends Base {
  constructor({okButtonTitle = OK_BUTTON_TITLE, cancelButtonTitle = CANCEL_BUTTON_TITLE} = {}) {
    console.info({version: '0.2.1'});
    super();
    this.okButtonTitle = okButtonTitle;
    this.cancelButtonTitle = cancelButtonTitle;
    this.state = {
      stack: []
    };
  }

  createElement() {
    return React.createElement(subscribe(this)(Stack), {modal: this});
  }

  dialog(options = {}) {
    return this.open(options);
  }

  alert(message, {okButton, ...otherOptions} = {}) {
    const options = {
      ...otherOptions,
      message,
      buttons: [this.getOKButton({okButton})]
    };
    return this.dialog(options);
  }

  confirm(message, {okButton, cancelButton, ...otherOptions} = {}) {
    const buttons = [this.getOKButton({okButton}), this.getCancelButton({cancelButton})];
    const options = {
      ...otherOptions,
      message,
      buttons
    };
    return this.dialog(options);
  }

  open(options) {
    return new Promise(resolve => {
      this.state.stack.push({options, resolve});
      this.publish();
    });
  }

  close = value => {
    const {resolve} = this.state.stack.pop();
    this.publish();
    resolve(value);
  };

  getStack() {
    return this.state.stack;
  }

  getOKButton({okButton}) {
    return mergeButton({
      defaultButton: {
        title: this.okButtonTitle,
        value: true,
        isDefault: true
      },
      button: okButton,
      onClose: this.close
    });
  }

  getCancelButton({cancelButton}) {
    return mergeButton({
      defaultButton: {
        title: this.cancelButtonTitle,
        value: false,
        isDefault: false
      },
      button: cancelButton,
      onClose: this.close
    });
  }
}

/*
Take a default "button" object `{title, value, isDefault}`
related to a given type of modal (E.g. OK or Cancel button),
a button object provided by the user {title, value or onClick, isDefault} and merge everything,
returning the button object to be used in the modal.
*/
function mergeButton({defaultButton, button, onClose}) {
  const merged = button ?
    {
      ...defaultButton,
      ...button
    } :
    defaultButton;
  // Default onClick handler: the modal will resolve with the `value` property of the button
  const defaultOnClick = () => {
    onClose(merged.value);
  };
  // When a custom onClick handler is provided, the user calls `close()` passing a value.
  // the modal will resolve with the value provided
  const customOnClick = () => {
    button.onClick({
      close: value => {
        onClose(value);
      }
    });
  };
  const onClick = button && button.onClick ? customOnClick : defaultOnClick;
  return {
    ...merged,
    onClick
  };
}
