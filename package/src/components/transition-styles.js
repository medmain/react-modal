import React from 'react';
import {Style} from 'radium';

/*
implement transitions for when the modal is opened or closed.
See `react-modal` package:
https://github.com/reactjs/react-modal/blob/921358e62e35c83775104d99edb258dad9cbbd05/docs/styles/transitions.md
*/

const TransitionStyles = () => {
  return (
    <Style
      rules={{
        '.ReactModal__Content': {opacity: 0},
        '.ReactModal__Content--after-open': {
          opacity: 1,
          transition: 'opacity 0.5s ease-in'
        },
        '.ReactModal__Content--before-close': {opacity: 0}
      }}
    />
  );
};

export default TransitionStyles;
