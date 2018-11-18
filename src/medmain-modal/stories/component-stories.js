import React, {Fragment} from 'react';
import {withKnobs, text, boolean, number} from '@storybook/addon-knobs';
import {storiesOf} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import {RadiumStarterRoot, RadiumStarter, Button} from 'radium-starter';

import {DialogButton, Message, Modal, Dialog, Alert, Confirm} from '../components';
import Slot from '../modal-stack-slot';
import MyModal from './MyModal';

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
  .add('Modal Base Component', () => {
    return <MyModal onClose={action('Modal closed!')} extra={'First example'} isOpen />;
  })
  .add('Dialog Button', () => {
    const onClose = action('Button pushed');
    const onClick = ({close}) => {
      close('Custom value!');
    };
    return (
      <Fragment>
        <DialogButton onClose={onClose} value="A" title="Value A" />{' '}
        <DialogButton onClose={onClose} value="B" title="Value B" />{' '}
        <DialogButton onClose={onClose} onClick={onClick} title="Custom Event Handler" />
      </Fragment>
    );
  })
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
