import React from 'react';
import {storiesOf} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import {RadiumStarterRoot, Button} from 'radium-starter';

import {ModalProvider, ModalConsumer} from '../modal-context';
import MyModal from './MyModal';

storiesOf('Context API', module)
  .addDecorator(story => (
    <RadiumStarterRoot>
      <ModalProvider>{story()}</ModalProvider>
    </RadiumStarterRoot>
  ))
  .add('showModal() example', () => (
    <ModalConsumer>
      {({showModal, hideModal}) => (
        <Button
          onClick={() =>
            showModal(MyModal, {extra: 'Second example', onClose: action('Modal closed!')})
          }
        >
          CALL `showModal()`
        </Button>
      )}
    </ModalConsumer>
  ));
