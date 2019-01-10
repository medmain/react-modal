import React from 'react';

const ModalStack = ({modalManager}) => {
  const {
    state: {stack},
  } = modalManager;
  return stack.length
    ? stack.map(({component: Component, props}, index) => {
        const {onClose} = props;
        const mergedOnClose = value => {
          modalManager.close();
          onClose(value);
        };
        return <Component {...props} onClose={mergedOnClose} key={index} />;
      })
    : null;
};

export default ModalStack;