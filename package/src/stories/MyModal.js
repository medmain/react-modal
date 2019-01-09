import React from 'react';

import {Modal} from '../components';
import {Button} from 'radium-starter';

/*
Example of custom dialog content built on top of the low-level `Modal` content
*/
const MyModal = ({extra, ...otherProps}) => (
  <Modal {...otherProps}>
    <Modal.Title>
      Art poétique <Button onClick={() => otherProps.onClose(false)}>[X]</Button>
    </Modal.Title>
    <Modal.Body>
      De la musique avant toute chose
      <br />
      Et pour cela...
      <br />
      {extra}
    </Modal.Body>
    <Modal.Footer>
      <Button onClick={() => otherProps.onClose(1)}>VALUE 1</Button>
      <Button onClick={() => otherProps.onClose(2)} style={{marginRight: '1rem'}}>
        VALUE 2
      </Button>
    </Modal.Footer>
  </Modal>
);

export default MyModal;
