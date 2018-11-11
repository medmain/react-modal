import React from 'react';

import {storiesOf} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import {RadiumStarterRoot, Button} from 'radium-starter';

import Modal from './original-modal';

const modal = new Modal();

storiesOf('Original implementation', module)
  .addDecorator(story => (
    <RadiumStarterRoot>
      {modal.createElement()}
      {story()}
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
                  close(200); // resolve with a custom value
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
