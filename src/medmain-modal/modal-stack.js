import React from 'react';

const ModalStack = ({stack, hideModal}) =>
  stack.length
    ? stack.map(({component: Component, props}, index) => {
        const style = {
          content: {
            top: `${20 * (index + 1)}px`,
            left: `${20 * (index + 1)}px`
          },
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)'
          }
        };
        const {onClose} = props;
        const mergedOnClose = value => {
          hideModal();
          onClose(value);
        };
        return <Component {...props} onClose={mergedOnClose} style={style} key={index} />;
      })
    : null;

export default ModalStack;
