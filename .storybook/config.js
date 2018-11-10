import {configure} from '@storybook/react';

function loadStories() {
  require('../src/medmain-modal/stories');
}

configure(loadStories, module);
