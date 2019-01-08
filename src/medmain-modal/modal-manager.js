import React from 'react';
import Base from '@ministate/base';
import subscribe from '@ministate/react';

import ModalStack from './modal-stack';
import {Alert, Confirm, Dialog, Modal, TransitionStyles} from './components';

class ModalManager extends Base {
  state = {
    stack: []
  };
  constructor(options = {}) {
    super();
    // available options: {okButtonTitle, cancelButtonTitle}
    this.options = options;
  }
  createElement() {
    const Stack = subscribe(this)(ModalStack);
    return (
      <>
        <TransitionStyles />
        <Stack modalManager={this} />
      </>
    );
  }
  open(component, props) {
    const enhance = withProps(this.options); // add 2 `***ButtonTitle` props to the component
    return new Promise(resolve => {
      this.setState({
        stack: [
          ...this.state.stack,
          {
            component: enhance(component),
            props: {onClose: value => resolve(value), ...props}
          }
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
          <Modal onClose={onClose} {...options}>
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

/*
Add some extra props to enhance a given React component
like `withProps()` from `recompose` package does.
Used to inject `okButtonTitle` and `cancelButtonTitle` to a given component
*/
const withProps = extraProps => Wrapped => props => Wrapped({...props, ...extraProps});

export default ModalManager;
