import {configure} from '@storybook/react';

function loadStories() {
  require('../src/medmain-modal/stories');
  require('../src/original/original-stories');
}

configure(loadStories, module);
