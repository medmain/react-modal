/*
Given the theme provided by Radium Starter,
return the style object to be applied to the ReactModal component
The object has 2 properties:
* overlay
* content
See http://reactcommunity.org/react-modal/styles/
*/
const getStyle = (t, s, ownStyle = {}) => {
  const {overlay, content} = ownStyle;
  const defaultStyles = {
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.5)'
    },
    content: {
      width: 500,
      margin: '0 auto',
      bottom: 'auto'
      // It seems we can't pass a Radium media-query to ReactModal `style` property
      // [`@media (max-width: ${t.smallBreakpoint})`]: {
      //   width: '300px',
      //   padding: '1rem'
      // }
    }
  };
  const mergedStyle = {
    overlay: {...defaultStyles.overlay, ...overlay},
    content: {...defaultStyles.content, ...content}
  };
  return mergedStyle;
};

export default getStyle;
