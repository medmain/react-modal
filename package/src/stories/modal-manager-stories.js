import {storiesOf} from '@storybook/react';

import ModalManager from '../modal-manager';
import addModalStories from './shared-stories'

const stories = storiesOf('ModalManager API', module)
addModalStories({ModalManager, stories}); 

