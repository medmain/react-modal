import React from 'react';
import Base from '@ministate/base';
import subscribe from '@ministate/react';

import ModalStack from './modal-stack';
import {Alert, Confirm, Dialog, Modal} from './components';

class ModalManager extends Base {
  state = {
    stack: []
  };
  createElement() {
    const Stack = subscribe(this)(ModalStack);
    return <Stack modalManager={this} />;
  }
  open(component, props) {
    return new Promise(resolve => {
      this.setState({
        stack: [
          ...this.state.stack,
          {component, props: {onClose: value => resolve(value), ...props}}
        ]
      });
    });
  }
  close() {
    if (this.state.stack.length) {
      this.setState({
        stack: this.state.stack.slice(0, -1)
      });
    }
  }
  dialog({render: CustomDialog, ...options}) {
    // if `render` attribute is used, a custom component is used instead of the default `Dialog` component
    const Component = CustomDialog
      ? ({onClose}) => (
          <Modal onClose={onClose}>
            <CustomDialog close={onClose} />
          </Modal>
        )
      : Dialog;
    return this.open(Component, options);
  }
  alert(message, options) {
    return this.open(Alert, {...options, message});
  }
  confirm(message, options) {
    return this.open(Confirm, {...options, message});
  }
}

export default ModalManager;
