import React, {Fragment} from 'react';
import {storiesOf} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import {RadiumStarterRoot, Button} from 'radium-starter';

import ModalClass from '../modal-class';

/* Example to be included in "Get Started" section of the documentation */
const modal = new ModalClass();

const GetStarted = () => {
  const start = async () => {
    const answer = await modal.confirm('Do you want to delete it?', {width: 700});
    console.info(answer); // => true or false
    action('Answer')(answer);
  };
  return (
    <div>
      <RadiumStarterRoot>
        {modal.createElement()}
        <Button onClick={start}>START</Button>
      </RadiumStarterRoot>
    </div>
  );
};

storiesOf('Modal Class API', module)
  .addDecorator(story => <div style={{textAlign: 'center', padding: '2rem'}}>{story()}</div>)
  .add('Get Started', GetStarted)
  .addDecorator(story => (
    <RadiumStarterRoot>
      <Fragment>
        {modal.createElement()}
        {story()}
      </Fragment>
    </RadiumStarterRoot>
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
