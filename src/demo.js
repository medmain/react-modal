import React from 'react';
import ReactModal from 'react-modal';
import {Button} from 'radium-starter';

import {ModalProvider, ModalConsumer} from './medmain-modal/modal-context';
import Modal from './medmain-modal/modal-class';
const modal = new Modal();

const ModalStep1 = ({onRequestClose, name, ...otherProps}) => (
  <ReactModal isOpen onRequestClose={onRequestClose} {...otherProps}>
    <h3>STEP 1 {name}</h3>
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
      {modal.createElement()}
      <ModalConsumer>
        {({showModal}) => {
          return (
            <div>
              <h2>Demo</h2>
              <Button onClick={() => showModal(ModalStep1, {name: 'mike'})}>
                `showModal()` method
              </Button>
              <br />
              <Button
                onClick={async () => {
                  const answer = await modal.dialog({
                    title: 'Question',
                    message: 'Are you sure?',
                    buttons: [
                      {title: 'Yes!', value: 1, isDefault: true},
                      {title: 'No :(', value: 0}
                    ]
                  });
                  console.info({answer});
                }}
              >
                `dialog()` method
              </Button>
              <hr />
            </div>
          );
        }}
      </ModalConsumer>
    </ModalProvider>
  );
};

Demo.propTypes = {};

export default Demo;
