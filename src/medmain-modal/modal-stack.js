import React from 'react';

const ModalStack = ({modalManager}) => {
  const stack = modalManager.state.stack;
  return stack.length
    ? stack.map(({component: Component, props}, index) => {
        const {width} = props;
        const style = width ? {content: {width}} : {};
        const {onClose} = props;
        const mergedOnClose = value => {
          modalManager.close();
          onClose(value);
        };
        return <Component {...props} onClose={mergedOnClose} style={style} key={index} />;
      })
    : null;
};

export default ModalStack;
