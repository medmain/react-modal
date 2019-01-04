import React from 'react';
import Base from '@ministate/base';
import subscribe from '@ministate/react';

import ModalStack from "./modal-stack";
import {Alert, Confirm, Dialog, Modal} from './components';

class ModalManager extends Base {
  state = {
    stack: []
  };
  createElement() {
    const Stack = subscribe(this)(ModalStack);
    return <Stack modalManager={this} />;
  }
  open({component, props}) {
    return new Promise(resolve => {
      this.setState({
        stack: [...this.state.stack, {component, props}]
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
          <Modal>
            <CustomDialog close={value => onClose(value)} />
          </Modal>
        )
      : Dialog;
    return this._showComponent(Component, options);
  }
  alert(message, options) {
    return this._showComponent(Alert, {...options, message});
  }
  confirm(message, options) {
    return this._showComponent(Confirm, {...options, message});
  }
  /*
  Private method used by alert(), confirm() and dialog()
  */
  _showComponent(component, props) {
    return new Promise(resolve => {
      this.open({
        component,
        props: {onClose: value => resolve(value), ...props}
      });
    });
  }
}

export default ModalManager;