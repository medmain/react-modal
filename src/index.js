import React from 'react';
import ReactDOM from 'react-dom';
import ReactModal from 'react-modal';
import App from './app';

ReactDOM.render(<App />, document.getElementById('root'));

ReactModal.setAppElement('#root'); // see http://reactcommunity.org/react-modal/accessibility/#app-element
