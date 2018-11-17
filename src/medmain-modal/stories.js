import React, {Fragment} from 'react';
import ReactModal from 'react-modal';

import {storiesOf} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import {RadiumStarterRoot, RadiumStarter, Button} from 'radium-starter';

import {DialogButton, Message, Modal, Dialog, Alert, ConfirmDialog} from './components';
import {ModalProvider, ModalConsumer} from './modal-context';
import ModalClass from './modal-class';
import getStyle from './components/style';
import Slot from './modal-stack-slot';

const MyModal = ({extra, ...otherProps}) => (
  <Modal {...otherProps}>
    <Modal.Title>
      Art poétique
      <Button onClick={() => otherProps.onClose(false)}>CLOSE</Button>
    </Modal.Title>
    <Modal.Body>
      De la musique avant toute chose
      <br />
      Et pour cela...
      <br />
      {extra}
    </Modal.Body>
    <Modal.Footer>
      <Button onClick={() => otherProps.onClose(1)}>VALUE 1</Button>{' '}
      <Button onClick={() => otherProps.onClose(2)}>VALUE 2</Button>
    </Modal.Footer>
  </Modal>
);

const modal = new ModalClass();

const Wrapper = ({style, children}) => {
  return (
    <RadiumStarter>
      {(t, s) => <Slot isOpen component={() => children} t={t} s={s} style={style} />}
    </RadiumStarter>
  );
};

storiesOf('Stateless Components', module)
  .addDecorator(story => {
    return (
      <RadiumStarterRoot>
        <RadiumStarter>{(t, s) => <Slot isOpen component={story} t={t} s={s} />}</RadiumStarter>
      </RadiumStarterRoot>
    );
  })
  .add('Modal Base Component', (props, x) => {
    return <MyModal onClose={action('Modal closed!')} extra={'First example'} isOpen />;
  })
  .add('Dialog Button', () => (
    <Fragment>
      <DialogButton onClose={action('Button pushed!')} value="A" title="Value A" />{' '}
      <DialogButton onClose={action('Button pushed!')} value="B" title="Value B" />
    </Fragment>
  ))
  .add('Message with raw HTML', () => (
    <Message text={{__html: 'De la <b>musique</b> avant toute chose'}} />
  ))
  .add('Dialog Component', () => (
    <Dialog
      onClose={action('Modal closed!')}
      title={'My dialog'}
      message={'De la musique avant toute chose'}
      buttons={[{title: 'Option A', value: 'A', isDefault: true}, {title: 'Option B', value: 'B'}]}
    />
  ))
  .add('Dialog Component with raw HTML', () => (
    <Dialog
      onClose={action('Modal closed!')}
      title={'My dialog'}
      message={{__html: 'De la <b>musique</b> avant toute chose'}}
      buttons={[{title: 'Option A', value: 'A', isDefault: true}, {title: 'Option B', value: 'B'}]}
    />
  ))
  .add('Alert Component', () => (
    <Alert onClose={action('Modal closed!')} title={'Success'} message={'It worked'} />
  ));

storiesOf('Stateless components - Style variations', module)
  .addDecorator(story => <RadiumStarterRoot>{story()}</RadiumStarterRoot>)
  .add('ConfirmDialog Component', () => (
    <Wrapper>
      <ConfirmDialog
        title="Warning"
        message="Are you sure? (default width)"
        onClose={action('Modal closed!')}
      />
    </Wrapper>
  ))
  .add('ConfirmDialog Component, custom width', () => (
    <Wrapper style={{content: {width: 700}}}>
      <ConfirmDialog
        title="Warning"
        message="Are you sure? (700px)"
        onClose={action('Modal closed!')}
        style={{content: {width: 700}}}
      />
    </Wrapper>
  ));

storiesOf('Modal Class API', module)
  .addDecorator(story => (
    <RadiumStarterRoot>
      <ModalProvider>
        <div style={{textAlign: 'center', padding: '2rem'}}>
          {modal.createElement()}
          {story()}
        </div>
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
          CALL `showModal()`
        </Button>
      )}
    </ModalConsumer>
  ))
  .add('.alert() example', () => (
    <Button
      onClick={async () => {
        const answer = await modal.alert('This is an alert.');
        action('Answer')(answer);
      }}
    >
      CALL `modal.alert()`
    </Button>
  ))
  .add('.confirm() basic example', () => (
    <Button
      onClick={async () => {
        const answer = await modal.confirm('Are you sure?');
        action('Answer')(answer);
      }}
    >
      `modal.confirm()` most basic example
    </Button>
  ))
  .add('.confirm() custom 1', () => (
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
      CALL `modal.confirm` with custom event handler
    </Button>
  ))
  .add('.confirm() custom 2', () => (
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
      CALL `modal.confirm` with custom button
    </Button>
  ))
  .add('.dialog() example', () => (
    <Button
      onClick={async () => {
        const answer = await modal.dialog({
          title: 'Choose an option',
          message: 'We have just called `modal.dialog()`',
          buttons: [
            {title: 'Option A', value: 'A', isDefault: true},
            {title: 'Option B', value: 'B'}
          ]
        });
        action('Answer')(answer);
      }}
    >
      Call `modal.dialog()`
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
  ))
  .add('Rendering raw HTML', () => (
    <Button
      onClick={async () => {
        const answer = await modal.confirm({
          __html: "De la <b>musique</b> avant toute chose<br />Et pour cela préfère l'impair"
        });
        action('Answer')(answer);
      }}
    >
      Show `confirm` modal with HTML
    </Button>
  ));
