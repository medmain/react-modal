/*
For compatibility with the existing API,
a class that provides the following method:
- createElement
- confirm
- alert
- dialog
*/
import React from 'react';

import {ModalProvider, ModalConsumer} from './modal-context';
import {Confirm, Alert, Dialog, Modal} from './components';

class ModalManager {
  constructor({okButtonTitle, cancelButtonTitle} = {}) {
    this.options = {
      okButtonTitle,
      cancelButtonTitle
    };
  }
  createElement() {
    const {okButtonTitle, cancelButtonTitle} = this.options;
    const enhance = withProps({okButtonTitle, cancelButtonTitle});
    return (
      <ModalProvider>
        <ModalConsumer>
          {({showModal /*hideModal*/}) => {
            // Attach the modal methods now that we have access to `showModal` function
            this.alert = showComponent({
              Component: enhance(Alert),
              showModal
            });
            this.confirm = showComponent({
              Component: enhance(Confirm),
              showModal
            });
            this.dialog = showDialog({
              showModal
            });
          }}
        </ModalConsumer>
      </ModalProvider>
    );
  }
}

const withProps = extraProps => Wrapped => props => Wrapped({...props, ...extraProps});

const showComponent = ({Component, showModal}) => (message, props = {}) => {
  const style = setModalStyle(props);
  return new Promise(resolve => {
    return showModal(Component, {message, style, ...props, onClose: value => resolve(value)});
  });
};
const showDialog = ({showModal}) => (props = {}) => {
  const style = setModalStyle(props);
  const {render: CustomDialog} = props; // `render` attribute can be used to render a custom dialog component
  return new Promise(resolve => {
    const Component = CustomDialog
      ? ({onClose}) => (
          <Modal onClose={() => console.log('close')}>
            <CustomDialog
              close={value => {
                resolve(onClose(value))
              }}
            />
          </Modal>
        )
      : Dialog;
    return showModal(Component, {style, ...props, onClose: value => resolve(value)});
  });
};

/*
Convert some optional attributes related to the styling (width, padding...)
into the style props applied to ReactModal
*/
const setModalStyle = props => {
  const contentProps = ['width', 'padding'];
  const reducer = (acc, val) => (props[val] ? {...acc, [val]: props[val]} : acc);
  const content = contentProps.reduce(reducer, {});
  return {content};
};

export default ModalManager;
