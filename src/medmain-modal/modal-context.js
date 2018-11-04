import React, {Component, createContext} from 'react';
import ModalStack from './modal-stack';

const ModalContext = createContext({
  component: null,
  props: {},
  index: -1,
  showModal: () => {},
  hideModal: () => {}
});

export class ModalProvider extends Component {
  showModal = (component, props = {}) => {
    this.setState(state => {
      const stack = [...state.stack, {component, props}];
      return {...state, stack};
    });
  };
  hideModal = () =>
    this.setState(state => {
      const stack = state.stack.slice(0, state.stack.length - 1);
      return {...state, stack};
    });
  state = {
    stack: []
  };
  render() {
    const {stack} = this.state;
    const value = {
      stack,
      showModal: this.showModal,
      hideModal: this.hideModal
    };
    return (
      <ModalContext.Provider value={value}>
        <ModalStack stack={stack} hideModal={this.hideModal} />
        {this.props.children}
      </ModalContext.Provider>
    );
  }
}

export const ModalConsumer = ModalContext.Consumer;
