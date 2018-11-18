import React from 'react';
import {RadiumStarter} from 'radium-starter';

import Slot from './modal-stack-slot';

const EmptySlot = ({index}) => <div>Slot {index}</div>; // a dummy components that will never been displayed

const SLOT_COUNT = 5;
const slots = [...Array(SLOT_COUNT).keys()]; // equivalent to Lodash times() => [0, 1, 2, 3, 4]

const ModalStack = ({stack, hideModal}) => {
  return (
    <RadiumStarter>
      {(t, s) =>
        slots.map(i => {
          const {component, props} =
            i < stack.length ? stack[i] : {component: EmptySlot, props: {index: i}};
          const isOpen = i < stack.length;
          return (
            <Slot
              component={component}
              key={`slot${i}`}
              isOpen={isOpen}
              t={t}
              s={s}
              hideModal={hideModal}
              {...props}
            />
          );
        })
      }
    </RadiumStarter>
  );
};

export default ModalStack;
