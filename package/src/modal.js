import React from 'react';
import Base from '@ministate/base';
import subscribe from '@ministate/react';

import {Stack} from './components/stack';
import {TransitionStyles} from './components/transition-styles';
import {getOkButton, getCancelButton} from './components/ok-cancel-button-helpers';

export class Modal extends Base {
  constructor(options = {}) {
    super();
    this.options = options; // available options: {okButtonTitle, cancelButtonTitle}
    this.state = {
      stack: []
    };
  }

  createElement() {
    const SubscribedStack = subscribe(this)(Stack);
    return (
      <>
        <TransitionStyles />
        <SubscribedStack modal={this} />
      </>
    );
  }

  dialog(options = {}) {
    return this.open(options);
  }

  alert(message, {okButton, okButtonTitle} = {}) {
    const options = {
      message,
      buttons: [getOkButton({okButtonTitle, okButton, onClose: this.close})]
    };
    return this.dialog(options);
  }

  confirm(message, {okButton, okButtonTitle, cancelTitle, cancelButton} = {}) {
    const buttons = [
      getOkButton({okButtonTitle, okButton, onClose: this.close}),
      getCancelButton({cancelTitle, cancelButton, onClose: this.close})
    ];
    const options = {
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
