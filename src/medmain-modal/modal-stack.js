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
        console.info('Render', Component, style);

        return <Component {...props} onRequestClose={hideModal} style={style} key={index} />;
      })
    : null;

export default ModalStack;
