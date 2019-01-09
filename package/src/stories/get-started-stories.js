import React from 'react';
import {storiesOf} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import {RadiumStarterRoot, Button} from 'radium-starter';

import ModalManager from '../modal-manager';

/* Example to be included in "Get Started" section of the documentation */
storiesOf('Get Started', module)
  .addDecorator(story => <div style={{textAlign: 'center', padding: '2rem'}}>{story()}</div>)
  .add('README.md example', () => {
    const modal = new ModalManager();
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
  });
