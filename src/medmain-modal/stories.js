import React from 'react';

import {storiesOf} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import {linkTo} from '@storybook/addon-links';
import {RadiumStarterRoot, Button} from 'radium-starter';

import {Dialog, ConfirmDialog} from './components';
import {ModalProvider, ModalConsumer} from './modal-context';
import Modal from './modal-class';

const buttons = [
  {title: 'Oui', value: 1, isDefault: true},
  {title: 'Non', value: 0, isDefault: false}
];

const MyModal = ({extra, ...otherProps}) => (
  <Dialog {...otherProps}>
    <Dialog.Title>
      Art poétique
      <Button onClick={() => otherProps.onClose(false)}>CLOSE</Button>
    </Dialog.Title>
    <Dialog.Body>
      De la musique avant toute chose
      <br />
      Et pour cela...
      <br />
      {extra}
    </Dialog.Body>
    <Dialog.Footer style={{backgroundColor: '#eee'}}>
      <Button onClick={() => otherProps.onClose(1)}>VALUE 1</Button>{' '}
      <Button onClick={() => otherProps.onClose(2)}>VALUE 2</Button>
    </Dialog.Footer>
  </Dialog>
);

const modal = new Modal();

storiesOf('Stateless Components', module)
  .addDecorator(story => <RadiumStarterRoot>{story()}</RadiumStarterRoot>)
  .add('Dialog Base Component', () => (
    <MyModal onClose={action('Modal closed!')} extra={'First example'} />
  ))
  .add('ConfirmDialog Component', () => (
    <ConfirmDialog title="Warning" message="Are you sure?" onClose={action('Modal closed!')} />
  ));

storiesOf('Modal Class API', module)
  .addDecorator(story => (
    <RadiumStarterRoot>
      <ModalProvider>
        {modal.createElement()}
        {story()}
      </ModalProvider>
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
          PUSH ME!
        </Button>
      )}
    </ModalConsumer>
  ))
  .add('Basic confirm() example', () => (
    <Button
      onClick={async () => {
        const answer = await modal.confirm('Are you sure?');
        action('Answer')(answer);
      }}
    >
      PUSH ME!
    </Button>
  ))
  .add('Custom confirm() example 1', () => (
    <Button
      onClick={async () => {
        const answer = await modal.confirm(
          'Are you sure? (Custom button label and onClick handler)',
          {
            okButton: {
              title: 'Yeees!',
              onClick: ({close}) => {
                action('Custom OK button!')();
                close(200); // the modal will resolve with a custom value
              }
            },
            cancelButton: {
              title: () => <span>No way</span>
            }
          }
        );
        action('Answer')(answer);
      }}
    >
      PUSH ME!
    </Button>
  ))
  .add('Custom confirm() example 2', () => (
    <Button
      onClick={async () => {
        const answer = await modal.confirm('Are you sure? (Number `1` should be returned)', {
          okButton: {
            value: 1
          }
        });
        action('Answer')(answer);
      }}
    >
      PUSH ME!
    </Button>
  ))
  .add('Original example', () => (
    <Button
      onClick={async () => {
        const answer = await modal.confirm(
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque nisl augue, condimentum vel feugiat vel, ullamcorper vitae nunc. Nulla facilisi. Praesent porta magna convallis vestibulum luctus. Integer lacinia, purus eget condimentum porta, mauris sem molestie purus, sit amet ultricies eros nisl sed tortor. Morbi sed rutrum mauris. Suspendisse orci urna, dapibus ut metus quis, scelerisque bibendum magna. Phasellus in nunc a elit ornare mattis. Quisque ultrices urna nisi. Sed eu pellentesque nisl, nec convallis massa. Etiam vitae turpis risus. Proin varius suscipit dui, id rhoncus mi sagittis sed. In rhoncus lacus velit, vel placerat lorem convallis quis. Duis ornare neque tortor, porttitor consectetur tellus cursus vitae. In vulputate porta libero id blandit. Duis fermentum sed sem et efficitur. Suspendisse potenti.',
          {
            title: 'Warning!',
            width: '700px',
            okButton: {
              onClick: async ({close}) => {
                const okay = await modal.confirm('Are you sure?');
                if (okay) {
                  close(200);
                }
              }
            }
          }
        );
        action('Answer')(answer);
      }}
    >
      START
    </Button>
  ));
