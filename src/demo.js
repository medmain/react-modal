import React from 'react';
import ReactModal from 'react-modal';
import {Button} from 'radium-starter';

import {ModalProvider, ModalConsumer} from './medmain-modal/modal-context';

const ModalStep1 = ({onRequestClose, ...otherProps}) => (
  <ReactModal isOpen onRequestClose={onRequestClose} {...otherProps}>
    <h3>STEP 1</h3>
    <ModalConsumer>
      {({showModal}) => <Button onClick={() => showModal(ModalStep2)}>STEP 2</Button>}
    </ModalConsumer>
  </ReactModal>
);

const ModalStep2 = ({onRequestClose, ...otherProps}) => (
  <ReactModal isOpen onRequestClose={onRequestClose} {...otherProps}>
    <h3>STEP 2</h3>
    <ModalConsumer>
      {({showModal}) => <Button onClick={() => showModal(ModalStep1)}>STEP 1</Button>}
    </ModalConsumer>
  </ReactModal>
);

const Demo = props => {
  return (
    <ModalProvider>
      <ModalConsumer>
        {({showModal, dialog}) => {
          return (
            <div>
              <h2>Demo</h2>
              <Button onClick={() => showModal(ModalStep1)}>`showModal()` method</Button>
            </div>
          );
        }}
      </ModalConsumer>
    </ModalProvider>
  );
};

Demo.propTypes = {};

export default Demo;
