import React, {Fragment} from 'react';

import {storiesOf} from '@storybook/react';

import ModalManager from './original-modal';
import addModalStories from '../medmain-modal/stories/shared-stories';

/*
Run the same stories with the previous implementation
*/
const stories = storiesOf('Original API', module);
addModalStories({ModalManager, stories});
