import React from 'react';
import Base from '@ministate/base';
import subscribe from '@ministate/react';

import {Stack} from './components/stack';
import {getOkButton, getCancelButton} from './components/ok-cancel-button-helpers';

const OK_BUTTON_TITLE = 'OK';
const CANCEL_BUTTON_TITLE = 'Cancel';

export class Modal extends Base {
  constructor({okButtonTitle = OK_BUTTON_TITLE, cancelButtonTitle = CANCEL_BUTTON_TITLE} = {}) {
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
      buttons: [getOkButton({okButton, okButtonTitle: this.okButtonTitle, onClose: this.close})]
    };
    return this.dialog(options);
  }

  confirm(message, {okButton, cancelButton, ...otherOptions} = {}) {
    const buttons = [
      getOkButton({okButtonTitle: this.okButtonTitle, okButton, onClose: this.close}),
      getCancelButton({
        cancelButtonTitle: this.cancelButtonTitle,
        cancelButton,
        onClose: this.close
      })
    ];
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
}
