import React from 'react';
import PropTypes from 'prop-types';

// import Modal from './modal';
// import Message from './message';

export const Dialog = ({close}) => <button onClick={() => close(true)}>Close from Dialog</button>;
Dialog.propTypes = {
  close: PropTypes.func.isRequired
};

// const Dialog = ({onClose, message, title, buttons, ...otherProps}) => {
//   return (
//     <Modal onClose={onClose} {...otherProps}>
//       {title && <Modal.Title>{title}</Modal.Title>}
//       <Modal.Body>
//         <Message text={message} />
//       </Modal.Body>
//       {buttons && (
//         <Modal.Footer>
//           <Modal.ActionBar onClose={onClose} buttons={buttons} />
//         </Modal.Footer>
//       )}
//     </Modal>
//   );
// };

// Dialog.propTypes = {
//   message: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
//   onClose: PropTypes.func.isRequired
// };
