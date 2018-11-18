import React, {Fragment} from 'react';
import {withKnobs, text, boolean, number} from '@storybook/addon-knobs';
import {storiesOf} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import {RadiumStarterRoot, RadiumStarter, Button} from 'radium-starter';

import {DialogButton, Message, Modal, Dialog, Alert, Confirm} from '../components';
import Slot from '../modal-stack-slot';

/*
Example of content we want to display in a modal window
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

// Wrapper used to be able to pass custom styles to the Modal
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
  .addDecorator(withKnobs)
  .add('Confirm Component', () => (
    <Wrapper>
      <Confirm
        title="Warning"
        message="Are you sure? (default width)"
        onClose={action('Modal closed!')}
      />
    </Wrapper>
  ))
  .add('Confirm Component, custom width', () => {
    const width = number('Width', 700, {min: 200, max: 1000, range: true, step: 20});
    const padding = number('Padding', 15, {min: 0, max: 50, range: true, step: 5});
    return (
      <Wrapper style={{content: {width, padding}}}>
        <Confirm
          title="Warning"
          message={`Are you sure? (width=${width}, padding=${padding}`}
          onClose={action('Modal closed!')}
        />
      </Wrapper>
    );
  });
