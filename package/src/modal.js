import React from 'react';
import Base from '@ministate/base';
import subscribe from '@ministate/react';

import {Stack} from './components/stack';
import {TransitionStyles} from './components/transition-styles';

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

  // alert(message, options) {
  //   const actualOptions = {
  //     // TODO
  //   };
  //   return this.dialog(actualOptions);
  // }

  // confirm(message, options) {
  //   const actualOptions = {
  //     // TODO
  //   };
  //   return this.dialog(actualOptions);
  // }

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
