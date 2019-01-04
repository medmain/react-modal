import React, {Component} from 'react';
import {RadiumStarterRoot, Button} from 'radium-starter';

// import Modal from './original/original-modal'; // the original implementation, to compare the results!
import ModalManager from './medmain-modal/modal-manager';
const modal = new ModalManager();

class App extends Component {
  async start() {
    const result = await modal.confirm(
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque nisl augue, condimentum vel feugiat vel, ullamcorper vitae nunc. Nulla facilisi. Praesent porta magna convallis vestibulum luctus. Integer lacinia, purus eget condimentum porta, mauris sem molestie purus, sit amet ultricies eros nisl sed tortor. Morbi sed rutrum mauris. Suspendisse orci urna, dapibus ut metus quis, scelerisque bibendum magna. Phasellus in nunc a elit ornare mattis. Quisque ultrices urna nisi. Sed eu pellentesque nisl, nec convallis massa. Etiam vitae turpis risus. Proin varius suscipit dui, id rhoncus mi sagittis sed. In rhoncus lacus velit, vel placerat lorem convallis quis. Duis ornare neque tortor, porttitor consectetur tellus cursus vitae. In vulputate porta libero id blandit. Duis fermentum sed sem et efficitur. Suspendisse potenti.',
      {
        title: 'Warning!',
        width: '700px',
        okButton: {
          onClick: async ({close}) => {
            const okay = await modal.confirm('Are you sure?');
            if (okay) {
              close(true);
            }
          }
        }
      }
    );

    console.log(result);
  }

  render() {
    return (
      <RadiumStarterRoot>
        <div
          style={{
            height: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Button onClick={this.start}>Start</Button>
        </div>

        {modal.createElement()}
      </RadiumStarterRoot>
    );
  }
}

export default App;
